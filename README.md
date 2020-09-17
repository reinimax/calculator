My calculator-project for Odin.
Basic functionality implemented.
Next steps:
- if decimal or an operator button is pressed, it should stay higlighted/active
- try to add keyboard support
-- buttons should also highlight/activate/deactivate when the according key is pressed!
- btw. try to make textfield read only!

Known, unresolved bugs:
- When a number in the input-field gets inverted, the new, inverted value is not stored, and calculations performed with the old value. But always storing the new, inverted number also causes problems, namely when a number is inverted that is the SECOND part of a calculation. Maybe a solution would be to introduce two storage-variables and stop using input-field-values directly in calculations.

The true problem is with the C and invert-buttons. The problem occurs when an operator is clicked and AFTER THAT the number on the display is altered via these buttons.
- One solution is to disable the buttons after an operator is clicked.

Sometimes it is not really clear what is a bug and what not. For example, there are different ways to let the "C"-Button work - but which one is correct?
- Like it is now: only the textfield is updated. So, if I type "12 +" and then decide "Oh no, I mistyped, just wanted to do "1 +", then the 12 is still stored, the new textfield-input is 1 and if I click "+" again, "13" is computed. But this also makes sense: stored value + value in textfield. One could even see this as a feature. For example, instead of typing "123456 + 12345" out, one could simply type it in once, click "+", delete the the "6" at the end, and compute the result.
- Another solution would be to update the stored variable on every click of the "C"-button and to reset the operator-variable. This would allow  to correct mistyping more easily. In the above example, "1" would be stored and the operator deleted, so I could merrily go an and click "+" again, enter another number and compute the desired result.
- Another solution would be to disable the "C"-button once an operator is clicked. I think, indicating what is clicked, active, disabled ... with CSS would make stuff far more intuitive.