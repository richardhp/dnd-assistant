export type PromptRuleType = `array` | `number` | `string`;

export type PromptRule = {
  type: PromptRuleType,
  arg?: any,
}

/**
 * 
 * @param text 
 * @param rule 
 * @returns 
 */
export function promptByType<T>(text: string, rule: PromptRule): T {
  while(true) {
    const input = prompt(`${text}: `);
    if (input === null) {
      console.log(`Must enter a value`);
      continue;
    }
    switch(rule.type) {
      case `array`: {
        if ((rule.arg as Array<string>).includes(input)) {
          return input as T;
        } else {
          console.log(`Value must be one of:`);
          (rule.arg as Array<string>).forEach((value)=> {
            console.log(value)
          });
          continue;
        }
      }
      case `string`:
        return input as T;
      case `number`: {
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(input)) {
          return Number(input) as T;
        }
        console.log(`Can only be number`);
        continue;
      }
    }
  }
}