// кнф:  (x1vx2)*(x2v-x3) ...
// допустим, что вектор не из жопы, ведь КНФ по нему как-то сделали...
export function solveTask7(vector: number[], knf: string): boolean {
  knf = knf.replaceAll(' ', '')
  let finalCheck = new Set<number>()
  const argCount = Math.log2(vector.length)
  const argValue: number[] = []
  for (let i = 0; i < argCount; i++) {
    argValue[i] = 2 ** (argCount - i - 1)
  }

  const splitKNF = knf.split("*")
  let argArray: string = ""

  for (let i = 0; i < splitKNF.length; i++) {
    let currentArgValue = 0
    let swingValues: number[] = []
    let negFlag = true
    for (let j = 1; j < splitKNF[i].length - 1; j++) {       //(x1*x2) (...)
      if (splitKNF[i][j] === "-") {
        negFlag = false
      }
      if (splitKNF[i][j] === "x") {
        if (argArray.search((+splitKNF[i][j + 1] + 1).toString()) === -1) {
          argArray += +negFlag  // [1213]
          argArray += (parseInt(splitKNF[i][j + 1]) + 1)
          negFlag = true
        } else {
          return false // bad user DNF
        }
      }
    }
    if (argArray.length > 0) {
      for (let j = 1; j < argArray.length; j += 2) {
        let flag = true
        if (argArray[j - 1] === "0") {
          flag = false
        } else {
          if (flag) {
            currentArgValue += argValue[+argArray[j] - 2]
          } else {
            currentArgValue -= argValue[+argArray[j] - 2]
          }
        }
        //6
      }
      for (let j = 2; j < argValue.length + 2; j++) {
        if (argArray.search(j.toString()) === -1) {
          swingValues.push(j)
        }
      } // "4"
      for (let j = 0; j < swingValues.length; j++) {
        for (let k = currentArgValue + argValue[swingValues[j] - 2]; k < vector.length; k += 2 ** argValue[swingValues[j] - 2]) {
          if (vector[k] === 0)
            finalCheck.add(k) // add to check
        }
      }
      if ((vector[currentArgValue] === 1)) {
        return false  // bad user DNF // incorrect???????
      } else {
        finalCheck.add(currentArgValue) // add to check
      }
    }
    argArray = ""
  }
  for (let i = 0; i < vector.length; i++) {
    if (vector[i] === 0) {
      if (!finalCheck.has(i)) {
        return false // bad user DNF
      }
    }
  }
  return true
}