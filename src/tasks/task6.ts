// днф:  (x1*x2)v(x2*-x3) ...
// допустим, что вектор не из жопы, ведь ДНФ по нему как-то сделали...
export function solveTask6(vector: number[], dnf: string): boolean {
  dnf = dnf.replaceAll(' ', '')
  let finalCheck = new Set<number>()
  const argCount = Math.log2(vector.length)
  const argValue: number[] = []
  for (let i = 0; i < argCount; i++) {
    argValue[i] = 2 ** (argCount - i - 1)
  }

  const splitDNF = dnf.split("v")
  let argArray: string = ""

  for (let i = 0; i < splitDNF.length; i++) {
    let currentArgValue = 0
    let swingValues: number[] = []
    let negFlag = true
    for (let j = 1; j < splitDNF[i].length - 1; j++) {       //(x1*x2) (...)
      if (splitDNF[i][j] === "-") {
        negFlag = false
      }
      if (splitDNF[i][j] === "x") {
        if (argArray.search((+splitDNF[i][j + 1] + 1).toString()) === -1) {
          argArray += +negFlag  // [1213]
          argArray += (parseInt(splitDNF[i][j + 1]) + 1)
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
          if (vector[k] === 1)
            finalCheck.add(k) // add to check
        }
      }
      if ((vector[currentArgValue] === 0)) {
        return false  // bad user DNF // incorrect???????
      } else {
        finalCheck.add(currentArgValue) // add to check
      }
    }
    argArray = ""
  }
  for (let i = 0; i < vector.length; i++) {
    if (vector[i] === 1) {
      if (!finalCheck.has(i)) {
        return false // bad user DNF
      }
    }
  }
  return true
}