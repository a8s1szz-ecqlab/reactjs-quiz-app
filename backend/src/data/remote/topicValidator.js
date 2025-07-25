/**
 * Topic data validator for remote JSON files
 */
class TopicValidator {
  
  /**
   * Validate topic data structure
   * @param {Object} data - Topic data to validate
   * @returns {Object} Validation result with success and errors
   */
  static validate(data) {
    const errors = [];
    
    if (!data || typeof data !== 'object') {
      return { success: false, errors: ['Data must be an object'] };
    }

    // Required fields validation
    const requiredFields = ['id', 'name', 'description', 'questions'];
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Type validations
    if (data.id && typeof data.id !== 'string') {
      errors.push('Field "id" must be a string');
    }

    if (data.name && typeof data.name !== 'string') {
      errors.push('Field "name" must be a string');
    }

    if (data.description && typeof data.description !== 'string') {
      errors.push('Field "description" must be a string');
    }

    if (data.icon && typeof data.icon !== 'string') {
      errors.push('Field "icon" must be a string');
    }

    if (data.timeLimit && typeof data.timeLimit !== 'number') {
      errors.push('Field "timeLimit" must be a number');
    }

    if (data.passingScore && typeof data.passingScore !== 'number') {
      errors.push('Field "passingScore" must be a number');
    }

    // Questions validation
    if (data.questions) {
      if (!Array.isArray(data.questions)) {
        errors.push('Field "questions" must be an array');
      } else {
        const questionErrors = this.validateQuestions(data.questions);
        errors.push(...questionErrors);
      }
    }

    // Version validation (optional)
    if (data.version && typeof data.version !== 'string') {
      errors.push('Field "version" must be a string');
    }

    // LastUpdated validation (optional)
    if (data.lastUpdated && !this.isValidDate(data.lastUpdated)) {
      errors.push('Field "lastUpdated" must be a valid ISO date string');
    }

    return {
      success: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Validate questions array
   * @param {Array} questions - Array of questions
   * @returns {Array} Array of error messages
   */
  static validateQuestions(questions) {
    const errors = [];

    if (questions.length === 0) {
      errors.push('Questions array cannot be empty');
      return errors;
    }

    questions.forEach((question, index) => {
      const questionErrors = this.validateQuestion(question, index);
      errors.push(...questionErrors);
    });

    // Check for duplicate question IDs
    const questionIds = questions.map(q => q.id).filter(id => id !== undefined);
    const duplicateIds = questionIds.filter((id, index) => questionIds.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate question IDs found: ${duplicateIds.join(', ')}`);
    }

    return errors;
  }

  /**
   * Validate individual question
   * @param {Object} question - Question object
   * @param {number} index - Question index for error reporting
   * @returns {Array} Array of error messages
   */
  static validateQuestion(question, index) {
    const errors = [];
    const prefix = `Question ${index + 1}`;

    if (!question || typeof question !== 'object') {
      errors.push(`${prefix}: must be an object`);
      return errors;
    }

    // Required fields
    const requiredFields = ['id', 'question', 'options', 'correctAnswer', 'difficulty'];
    for (const field of requiredFields) {
      if (question[field] === undefined || question[field] === null) {
        errors.push(`${prefix}: missing required field "${field}"`);
      }
    }

    // ID validation
    if (question.id !== undefined && typeof question.id !== 'number') {
      errors.push(`${prefix}: "id" must be a number`);
    }

    // Question text validation
    if (question.question !== undefined && typeof question.question !== 'string') {
      errors.push(`${prefix}: "question" must be a string`);
    }

    // Options validation
    if (question.options !== undefined) {
      if (!Array.isArray(question.options)) {
        errors.push(`${prefix}: "options" must be an array`);
      } else {
        if (question.options.length < 2) {
          errors.push(`${prefix}: must have at least 2 options`);
        }
        
        question.options.forEach((option, optIndex) => {
          if (typeof option !== 'string') {
            errors.push(`${prefix}: option ${optIndex + 1} must be a string`);
          }
        });
      }
    }

    // Correct answer validation
    if (question.correctAnswer !== undefined) {
      if (typeof question.correctAnswer !== 'number') {
        errors.push(`${prefix}: "correctAnswer" must be a number`);
      } else if (question.options && (question.correctAnswer < 0 || question.correctAnswer >= question.options.length)) {
        errors.push(`${prefix}: "correctAnswer" index out of range`);
      }
    }

    // Difficulty validation
    if (question.difficulty !== undefined) {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      if (!validDifficulties.includes(question.difficulty)) {
        errors.push(`${prefix}: "difficulty" must be one of: ${validDifficulties.join(', ')}`);
      }
    }

    // Explanation validation (optional)
    if (question.explanation !== undefined && typeof question.explanation !== 'string') {
      errors.push(`${prefix}: "explanation" must be a string`);
    }

    return errors;
  }

  /**
   * Check if string is a valid ISO date
   * @param {string} dateString - Date string to validate
   * @returns {boolean} True if valid date
   */
  static isValidDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toISOString() === dateString;
    } catch {
      return false;
    }
  }

  /**
   * Sanitize topic data (remove invalid fields, set defaults)
   * @param {Object} data - Raw topic data
   * @returns {Object} Sanitized topic data
   */
  static sanitize(data) {
    if (!data || typeof data !== 'object') {
      return null;
    }

    const sanitized = {
      id: data.id,
      name: data.name,
      description: data.description,
      icon: data.icon || '📚',
      timeLimit: data.timeLimit || 960, // Default 16 minutes
      passingScore: data.passingScore || 70,
      version: data.version || '1.0.0',
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      questions: []
    };

    // Sanitize questions
    if (Array.isArray(data.questions)) {
      sanitized.questions = data.questions
        .filter(q => q && typeof q === 'object')
        .map(question => ({
          id: question.id,
          question: question.question,
          options: Array.isArray(question.options) ? question.options : [],
          correctAnswer: question.correctAnswer,
          difficulty: question.difficulty || 'beginner',
          explanation: question.explanation || ''
        }))
        .filter(q => 
          q.id !== undefined && 
          q.question && 
          q.options.length >= 2 && 
          q.correctAnswer !== undefined &&
          q.correctAnswer >= 0 && 
          q.correctAnswer < q.options.length
        );
    }

    return sanitized;
  }
}

module.exports = TopicValidator;
