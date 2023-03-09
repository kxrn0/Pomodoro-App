/*
How should I make this? I think I can break the app into at least four components; 
the buttons to select the mode, the timer, the popup component, and the contends of
the popup. How, then, shoould I go about doing this? The app is fundamentally very
simple, and has a single function, so I think I can hold the state of the app at the 
top without issue.

What states can the timer be in?
I think the timer can be in four states; initial, running, paused, and final.
Some states feel superfluous, I think I could get away with less.
What's the smaller number of states I can use? what if I use three, "running", "paused",
and "final"? When the user first clicks the start button, the timer's state changes
from "paused" to "running". If the user decides to pause the timer before the time is
over, the timer's state is set to "paused". Once the time is over, the timer enters the 
state of "finished". From the state of "finished", the user can only go to the state of
"paused", where the timer is reset. And from there the cycle continues.

How do I deal with fonts? The fonts kumbh and roboto are variable,
so I can just change the weight for the same family. The font 
space, however, is not variable, and I have to import it as two
different families. So for the class ".kumbh", for example, I will
use one font family, while for the class ".space" I will have to use
two different families. Furthermore, when the kumbh and roboto 
fonts are used, only one weight is used for all page, but when space
is used, two of its weight are used. 

Now what? The maximum amount of minutes that the user will be able to work for is 59.
I need to add two types of listeners to the number inputs, since that would make it easier
for the user to change the time. If I just add an event listener for change of input, then
I'll have to make sure that the user enters a valid number, but that would mean that the user
can't clear the input completely, so a digit will be always stuck in there making sure that the
input is valid, but also making it more tedious for the user to change the value of the input.

How can I limit the number of words in a string dynamically based on how many substrings the 
given string can be split into at a character? 
*/