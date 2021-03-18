# Pre-work - Mini Simon

**Mini Simon** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Howard Ma**

Time spent: **7** hours spent in total

Link to project: https://glitch.com/edit/#!/mini-simon?path=README.md%3A1%3A0

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Visuals for 3 lives are displayed

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](https://cdn.glitch.com/1bbf7e6a-cebb-483d-b403-06643b1566ef%2FWin%20Demo.gif?v=1616029702962)
![](https://cdn.glitch.com/1bbf7e6a-cebb-483d-b403-06643b1566ef%2FLoss%20Demo.gif?v=1616029694706)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

Random Secret Pattern – random integer generation: 
https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/math/random

Spruce up your buttons - Button Audio: 
https://programminghead.com/how-to-play-audio-in-html-using-javascript/
https://stackoverflow.com/questions/14834520/html5-audio-stop-function
https://forum.freecodecamp.org/t/play-audio-while-mouse-button-is-pressed/107005

Add a ticking clock – Timer: 
https://stackoverflow.com/questions/7325146/countdown-timer-with-pause-reset

show/hide image: 
https://stackoverflow.com/questions/15318357/show-hide-image-with-javascript#15318372
https://www.w3schools.com/CSSref/pr_class_visibility.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

I spent a lot of time implementing the timer. I had no idea how to build a timer. After searching online, I found a way to build a countdown timer that starts counting down after the page loads. 
I modified it so after the timer hits zero, the timer() function triggers the loseGame() function and resets the timer. After the user guesses correctly or when a new game starts, the game would 
also reset the timer. However, as I started testing the timer, I realized the timer started decreasing by two after I completed one round, and it decreased by 3, 4, 5 as rounds went on. The timer 
was seemingly altering between two separate timers. The loseGame() function also was triggered multiple times instead of once per game. I combed through my code to find the issue. I knew the bug 
was either in my timer() function or one of the functions which call it. I found out the timer function was called in both startGame() and playClueSequence(). I deleted the timer() function in 
startGame() and tried again. Another error occurred. The game ends after seeing the first pattern, with the stop button changing to the start button. I recognized the problem. The timer wasn’t 
properly reset after each round since the clearInterval() method isn’t clearing the timer. Another issue occurred. I used a setTimeOut() function to sync the stopGame() function with the timer, 
but the stopGame() function would stop the game when it shows two on the timer. I tried to fix it. I added and deleted function calls, edited parameters in my timer() function, but nothing worked. 
I decided to start fresh since my code was getting messy. I reverted to a previous version using the Rewind tool in Glitch. I took a different approach. Instead of trying to sync the stopGame() 
function with the timer, the timer() function would trigger the stopGame() function. I also found another method of implementing the timer. After learning the underlying logic behind the new function, 
I implemented the method with my modifications. Now, I have a timer for my mini-Simon game!

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

How do people collaborate on full-stack projects? Since one change in CSS styling or HTML structuring can drastically alter the appearance of a web app. 
Is one person or only a few people responsible for the changes to the HTML/CSS of a web app at a time? Because I imagine there could be too many hands without good collaboration. 
Also, how do front and back-end engineers work together? Back-end aims to increase efficiency. Even though the speed affects the user experience, sometimes the best choice is to 
sacrifice speed for a better user experience. Do these design choice conflicts exist? If yes, is it an issue during development? Many back-end engineers have front-end knowledge 
and vice versa, but what if one or more team members do not have the sufficient proficiency to understand a design choice by the other side? Would that be a significant hindrance? 
Do front-end engineers or even back-end engineers give opinions on a web app's design? Or is it entirely determined by UI/UX designers? Since many choose to learn full-stack web app, 
for some projects, would some back-end engineers be helping out on front-end and front-end engineers helping out on back-end? For projects on a larger scale, are there still full-stack developers? 
Or does everybody choose to specialize in one domain?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

I would implement a local leaderboard. After each game, there will be a prompt where you can enter your name. Then a leaderboard under the game buttons would show your name and progress. 
It would save the name and data in an array until the user refreshes the page. The leaderboard would refresh every time a user adds a new entry, so the entries with the highest progress 
will be on the top. Only ten entries with the top progress would be displayed. I would also implement a proper scoring system and substitute the progress on the leaderboard with points. 
The page would show the current level the user is on. The faster the user answers, the more points they get. There will be a score multiplier. The higher the level, the higher the score multiplier. 
If the user has lives leftover, they will get extra points. The game would be more challenging. If I have more time, I would add a difficulty setting with three settings, easy, medium, and hard. 
The user would be able to choose the difficulty with a dropdown menu. Compared to easy, the hard difficulty would be faster. There will be three strikes for easy, two for medium, and one for hard. 
There will be three separate leaderboards. I will try to combine them into one leaderboard with three tabs. I could also build an infinity mode. There will be a toggle button that will enable 
infinity mode. The web app populates the pattern as the game goes on instead of at the start of the game. After every round, it adds a random number to the pattern. The player loses after three strikes. 
I would make an additional leaderboard for this mode.


## License

    Copyright Howard Ma

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.