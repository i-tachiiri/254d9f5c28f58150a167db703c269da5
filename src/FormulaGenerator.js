class FormulaGenerator {
  constructor() {}
  
  generateFormulas() {
    console.log('Generating addition formulas (sum ≤ 10)...');
    
    const totalProblems = 1000;
    const problemsPerPage = 10;
    const totalPages = totalProblems / problemsPerPage; // 100ページ
    const formulas = [];
    
    // 全ての有効な組み合わせを生成
    const validCombinations = [];
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        const sum = x + y;
        if (sum <= 10) {
          validCombinations.push([x, '+', y, '=', sum]);
        }
      }
    }
    
    console.log(`Found ${validCombinations.length} valid combinations`);
    
    // 各ページごとに重複のない問題を生成
    for (let page = 0; page < totalPages; page++) {
      // 有効な組み合わせをシャッフル
      const shuffledCombinations = this.shuffleArray([...validCombinations]);
      
      // このページの10問を追加（重複なし）
      for (let i = 0; i < problemsPerPage; i++) {
        const combination = shuffledCombinations[i];
        formulas.push([...combination]);
      }
    }
    
    console.log(`Generated ${formulas.length} formulas across ${totalPages} pages`);
    return formulas;
  }
  
  
  // ============ UTILITY METHODS ============
  // These methods are ready to use in your formula generation

  // ------------ Helper Methods ------------

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  numberToDigits(number) {
    return number.toString().split('');
  }

}