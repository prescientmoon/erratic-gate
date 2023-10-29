/**
 * In case the people who look at my projet open the console -_-
 */
export const logWelcome = () => {
  const commonStyles = 'padding: 3px'
  const titleStyles = `font-size: 3em;`

  console.log(
    `%c Hello
        %c I don't know if you see this, 
        but if you do than you are probably wondering... 
        Why did I include this? The answer is - I don't know. 
        At first, it seemed like a good idea to include a welcome message in the console
        (in case someone randomly openes it), but now i don't even know what i'm doing :) 
        Anyways, I hope you are having a good time in my simulator!!!`
      .split('\n')
      .map((s) => s.trim())
      .join(' '),
    `${titleStyles}`,
    `${commonStyles}`
  )
}
