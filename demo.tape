Output demo.gif
Set FontSize 14
Set Width 920
Set Height 580
Set Shell "zsh"
Set Theme "Catppuccin Mocha"
Set TypingSpeed 30ms
Set Padding 20

Type "node"
Enter
Sleep 1s

Type "const { getEncodings, charInfo, searchCharacters } = await import('unicodefyi')"
Enter
Sleep 1.5s

Type "charInfo('∞')"
Enter
Sleep 2.5s

Type "getEncodings('π')"
Enter
Sleep 2.5s

Type "searchCharacters('arrow', 3)"
Enter
Sleep 2.5s

Type ".exit"
Enter
Sleep 1s
