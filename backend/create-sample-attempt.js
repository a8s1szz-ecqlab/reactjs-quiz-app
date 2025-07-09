const DatabaseOperations = require('./src/data/database');
const { getQuizQuestions, validateAnswers, getProficiencyLevel } = require('./src/utils/questionUtils');

async function createSampleCompletedAttempt() {
  console.log('Creating sample completed quiz attempt...');
  
  try {
    // Initialize database
    await DatabaseOperations.init();
    
    // Get sample questions (first 10 for testing)
    const allQuestions = getQuizQuestions();
    const sampleQuestions = allQuestions.slice(0, 10);
    
    // Create sample answers (mix of correct and incorrect)
    const sampleAnswers = [
      { questionId: 0, selectedAnswer: 0, isCorrect: true, timeSpent: 30 },
      { questionId: 1, selectedAnswer: 1, isCorrect: false, timeSpent: 45 },
      { questionId: 2, selectedAnswer: 2, isCorrect: true, timeSpent: 25 },
      { questionId: 3, selectedAnswer: 0, isCorrect: true, timeSpent: 35 },
      { questionId: 4, selectedAnswer: 3, isCorrect: false, timeSpent: 40 },
      { questionId: 5, selectedAnswer: 1, isCorrect: true, timeSpent: 20 },
      { questionId: 6, selectedAnswer: 2, isCorrect: false, timeSpent: 50 },
      { questionId: 7, selectedAnswer: 0, isCorrect: true, timeSpent: 30 },
      { questionId: 8, selectedAnswer: 1, isCorrect: true, timeSpent: 25 },
      { questionId: 9, selectedAnswer: 2, isCorrect: true, timeSpent: 35 }
    ];
    
    // Calculate results
    const correctAnswers = sampleAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = sampleQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const proficiencyLevel = getProficiencyLevel(percentage);
    
    // Create incorrect answers details
    const incorrectAnswers = sampleAnswers
      .filter(answer => !answer.isCorrect)
      .map(answer => {
        const question = sampleQuestions[answer.questionId];
        return {
          questionId: answer.questionId,
          question: question.question,
          options: question.options,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        };
      });
    
    const detailedResults = sampleAnswers.map(answer => {
      const question = sampleQuestions[answer.questionId];
      return {
        questionId: answer.questionId,
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: answer.isCorrect,
        timeSpent: answer.timeSpent
      };
    });
    
    const results = {
      score: correctAnswers,
      totalQuestions: totalQuestions,
      percentage: percentage,
      proficiencyLevel: proficiencyLevel,
      totalTime: 335, // Sum of timeSpent
      timeLeft: 865, // 1200 - 335
      incorrectAnswers: incorrectAnswers,
      detailedResults: detailedResults,
      completedAt: new Date().toISOString()
    };
    
    // Update the first attempt to be completed
    const updatedAttempt = await DatabaseOperations.updateAttempt('ATT000001', {
      status: 'completed',
      startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      completedAt: new Date().toISOString(),
      questions: sampleQuestions,
      answers: sampleAnswers,
      results: results
    });
    
    console.log('Sample completed attempt created successfully!');
    console.log('Attempt ID: ATT000001');
    console.log('Student: John Doe (STUD0001)');
    console.log(`Score: ${correctAnswers}/${totalQuestions} (${percentage}%)`);
    console.log(`Proficiency: ${proficiencyLevel.grade}`);
    
  } catch (error) {
    console.error('Error creating sample completed attempt:', error);
  }
}

createSampleCompletedAttempt();
