export const adderActivation = (full: boolean) => `
    const a = context.getBinary(0)
    const b = context.getBinary(1)
    ${full ? `const c = context.getBinary(2)` : ''}

    const sum = a + b + ${full ? `c` : '0'}

    context.setBinary(0, sum)
    context.setBinary(1, sum >> context.maxLength)
`
