import jsPDF from 'jspdf';

class PDFService {
  /**
   * Generate a PDF report for quiz results
   * @param {Object} resultData - The quiz result data
   * @param {Object} studentInfo - Student information (optional)
   * @returns {Promise<void>} - Downloads the PDF
   */
  static async generateQuizResultsPDF(resultData, studentInfo = null) {
    const {
      score,
      totalQuestions,
      percentage,
      proficiencyLevel,
      totalTime,
      incorrectAnswers = [],
      skippedCount = 0,
      detailedResults = [],
      attemptId,
      completedAt
    } = resultData;

    // Create new PDF document
    const pdf = new jsPDF();
    
    // Set up fonts and colors
    const primaryColor = [41, 128, 185]; // Blue
    const successColor = [39, 174, 96]; // Green
    const errorColor = [231, 76, 60]; // Red
    const textColor = [52, 73, 94]; // Dark gray
    
    let yPosition = 20;
    const lineHeight = 8;
    const sectionSpacing = 15;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > 280) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Helper function to format time
    const formatTime = (seconds) => {
      return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(...primaryColor);
    pdf.text('ReactJS Quiz Results', margin, yPosition);
    yPosition += 15;

    // Subtitle with date
    pdf.setFontSize(12);
    pdf.setTextColor(...textColor);
    const currentDate = completedAt ? new Date(completedAt).toLocaleDateString() : new Date().toLocaleDateString();
    pdf.text(`Generated on: ${currentDate}`, margin, yPosition);
    yPosition += sectionSpacing;

    // Student Information (if provided)
    if (studentInfo) {
      checkPageBreak(30);
      pdf.setFontSize(14);
      pdf.setTextColor(...primaryColor);
      pdf.text('Student Information', margin, yPosition);
      yPosition += lineHeight + 2;
      
      pdf.setFontSize(10);
      pdf.setTextColor(...textColor);
      if (studentInfo.name) {
        pdf.text(`Name: ${studentInfo.name}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (studentInfo.studentId) {
        pdf.text(`Student ID: ${studentInfo.studentId}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (attemptId) {
        pdf.text(`Attempt ID: ${attemptId}`, margin, yPosition);
        yPosition += lineHeight;
      }
      yPosition += sectionSpacing;
    }

    // Overall Score Section
    checkPageBreak(50);
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.text('Overall Performance', margin, yPosition);
    yPosition += lineHeight + 2;

    // Score circle representation
    pdf.setFontSize(24);
    const scoreColor = percentage >= 70 ? successColor : errorColor;
    pdf.setTextColor(...scoreColor);
    pdf.text(`${percentage}%`, margin, yPosition);
    
    // Grade information
    if (proficiencyLevel) {
      pdf.setFontSize(12);
      pdf.text(`Grade: ${proficiencyLevel.grade || 'N/A'}`, margin + 60, yPosition - 5);
      yPosition += lineHeight;
    }
    yPosition += sectionSpacing;

    // Statistics Section
    checkPageBreak(60);
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.text('Quiz Statistics', margin, yPosition);
    yPosition += lineHeight + 2;

    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    
    const stats = [
      { label: 'Correct Answers:', value: `${score} / ${totalQuestions}` },
      { label: 'Incorrect Answers:', value: incorrectAnswers.length },
      { label: 'Skipped Questions:', value: skippedCount },
      { label: 'Time Taken:', value: formatTime(totalTime || 0) },
      { label: 'Success Rate:', value: `${percentage}%` }
    ];

    stats.forEach(stat => {
      pdf.text(`${stat.label}`, margin, yPosition);
      pdf.text(`${stat.value}`, margin + 80, yPosition);
      yPosition += lineHeight;
    });
    yPosition += sectionSpacing;

    // Proficiency Assessment
    if (proficiencyLevel && proficiencyLevel.message) {
      checkPageBreak(30);
      pdf.setFontSize(14);
      pdf.setTextColor(...primaryColor);
      pdf.text('Proficiency Assessment', margin, yPosition);
      yPosition += lineHeight + 2;

      pdf.setFontSize(10);
      pdf.setTextColor(...textColor);
      const lines = pdf.splitTextToSize(proficiencyLevel.message, contentWidth);
      lines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += sectionSpacing;
    }

    // Incorrect Answers Review (if any)
    if (incorrectAnswers.length > 0) {
      checkPageBreak(40);
      pdf.setFontSize(14);
      pdf.setTextColor(...primaryColor);
      pdf.text('Questions to Review', margin, yPosition);
      yPosition += lineHeight + 5;

      incorrectAnswers.forEach((answer, index) => {
        checkPageBreak(50);
        
        // Question number and status
        pdf.setFontSize(11);
        pdf.setTextColor(...errorColor);
        const questionIndex = detailedResults.findIndex(ua => ua.questionId === answer.questionId);
        pdf.text(`Question ${questionIndex + 1} - Incorrect`, margin, yPosition);
        yPosition += lineHeight + 2;

        // Question text
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        const questionLines = pdf.splitTextToSize(answer.question, contentWidth);
        questionLines.forEach(line => {
          checkPageBreak();
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        yPosition += 3;

        // Options
        answer.options.forEach((option, optIndex) => {
          checkPageBreak();
          const isCorrect = optIndex === answer.correctAnswer;
          const isSelected = optIndex === answer.selectedAnswer;
          
          let prefix = String.fromCharCode(65 + optIndex) + '. ';
          let color = textColor;
          
          if (isCorrect) {
            prefix += '✓ ';
            color = successColor;
          } else if (isSelected) {
            prefix += '✗ ';
            color = errorColor;
          }
          
          pdf.setTextColor(...color);
          const optionLines = pdf.splitTextToSize(prefix + option, contentWidth - 10);
          optionLines.forEach(line => {
            pdf.text(line, margin + 5, yPosition);
            yPosition += lineHeight;
          });
        });
        yPosition += 3;

        // Explanation
        if (answer.explanation) {
          checkPageBreak(20);
          pdf.setFontSize(9);
          pdf.setTextColor(...textColor);
          pdf.text('Explanation:', margin, yPosition);
          yPosition += lineHeight;
          
          const explanationLines = pdf.splitTextToSize(answer.explanation, contentWidth - 10);
          explanationLines.forEach(line => {
            checkPageBreak();
            pdf.text(line, margin + 5, yPosition);
            yPosition += lineHeight;
          });
        }
        
        yPosition += sectionSpacing;
      });
    }

    // Footer with motivational message
    checkPageBreak(30);
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text('Next Steps', margin, yPosition);
    yPosition += lineHeight + 2;

    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    let motivationalText;
    if (percentage >= 80) {
      motivationalText = "Excellent ReactJS knowledge! You're ready for advanced React projects!";
    } else if (percentage >= 60) {
      motivationalText = "Good ReactJS foundation! Practice with more complex React patterns!";
    } else {
      motivationalText = "Keep learning ReactJS fundamentals! Check out the official React docs!";
    }
    
    const motivationalLines = pdf.splitTextToSize(motivationalText, contentWidth);
    motivationalLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const studentPrefix = studentInfo?.studentId || 'student';
    const filename = `ReactJS_Quiz_Results_${studentPrefix}_${timestamp}.pdf`;

    // Download the PDF
    pdf.save(filename);
  }

  /**
   * Generate a summary PDF for multiple quiz attempts
   * @param {Array} attempts - Array of quiz attempts
   * @param {Object} studentInfo - Student information
   */
  static async generateStudentSummaryPDF(attempts, studentInfo) {
    const pdf = new jsPDF();
    const primaryColor = [41, 128, 185];
    const textColor = [52, 73, 94];
    
    let yPosition = 20;
    const lineHeight = 8;
    const margin = 20;

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(...primaryColor);
    pdf.text('ReactJS Quiz Performance Summary', margin, yPosition);
    yPosition += 20;

    // Student info
    pdf.setFontSize(12);
    pdf.setTextColor(...textColor);
    if (studentInfo.name) {
      pdf.text(`Student: ${studentInfo.name}`, margin, yPosition);
      yPosition += lineHeight;
    }
    if (studentInfo.studentId) {
      pdf.text(`Student ID: ${studentInfo.studentId}`, margin, yPosition);
      yPosition += lineHeight;
    }
    pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Attempts summary
    const completedAttempts = attempts.filter(a => a.status === 'completed');
    
    if (completedAttempts.length > 0) {
      pdf.setFontSize(14);
      pdf.setTextColor(...primaryColor);
      pdf.text('Quiz Attempts History', margin, yPosition);
      yPosition += 15;

      completedAttempts.forEach((attempt, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        
        const date = new Date(attempt.completedAt).toLocaleDateString();
        const score = attempt.results?.score || 0;
        const total = attempt.results?.totalQuestions || 0;
        const percentage = attempt.results?.percentage || 0;
        
        pdf.text(`Attempt ${index + 1} - ${date}`, margin, yPosition);
        pdf.text(`Score: ${score}/${total} (${percentage}%)`, margin + 100, yPosition);
        yPosition += lineHeight + 2;
      });
    }

    const filename = `ReactJS_Quiz_Summary_${studentInfo.studentId}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
  }
}

export default PDFService;
