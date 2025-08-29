const PAGE_ID = '254d9f5c28f58150a167db703c269da5';

function generateAndWriteFormulas() {
  console.log(`Starting formula generation for page: ${PAGE_ID}`);
  
  try {
    const notionService = new NotionService();
    const spreadsheetService = new SpreadsheetService();
    const formulaGenerator = new FormulaGenerator();
    
    // 初回実行時にNotionのQuizScriptUrlを更新
    try {
      console.log('Updating Notion with script URL...');
      notionService.updateNotionWithScriptUrl(PAGE_ID);
    } catch (notionError) {
      console.warn('Failed to update Notion script URL (proceeding with formula generation):', notionError);
    }
    
    console.log('Getting QuestionSheetUrl from Notion...');
    const questionSheetUrl = notionService.getQuestionSheetUrl(PAGE_ID);
    console.log(`Retrieved URL: ${questionSheetUrl}`);
    
    console.log('Generating formulas...');
    const formulas = formulaGenerator.generateFormulas();
    
    console.log(`Generated ${formulas.length} formulas`);
    
    console.log('Writing formulas to spreadsheet...');
    spreadsheetService.writeFormulasToDataSheet(questionSheetUrl, formulas);
    
    console.log('Formula generation and writing completed successfully');
    
  } catch (error) {
    console.error(`Error in generateAndWriteFormulas: ${error}`);
    throw error;
  }
}

function testFormulaGeneration() {
  console.log('Testing formula generation...');
  
  try {
    const formulaGenerator = new FormulaGenerator();
    const formulas = formulaGenerator.generateFormulas();
    
    console.log(`Generated ${formulas.length} formulas`);
    console.log('First 10 formulas:', formulas.slice(0, 10));
    console.log('Last 10 formulas:', formulas.slice(-10));
    
    // 条件チェック
    let validCount = 0;
    let invalidCount = 0;
    
    for (const formula of formulas) {
      const [x, op, y, eq, z] = formula;
      if (x >= 1 && x <= 9 && y >= 1 && y <= 9 && z <= 10 && x + y === z && op === '+' && eq === '=') {
        validCount++;
      } else {
        invalidCount++;
        if (invalidCount <= 5) {
          console.log('Invalid formula:', formula);
        }
      }
    }
    
    console.log(`Valid formulas: ${validCount}`);
    console.log(`Invalid formulas: ${invalidCount}`);
    
    return formulas;
    
  } catch (error) {
    console.error('Error in testFormulaGeneration:', error);
    throw error;
  }
}

