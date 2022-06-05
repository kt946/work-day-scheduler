# Work Day Scheduler

For this week's challenge, I built a work day scheduler using HTML, CSS, JavaScript, and third-party APIs such as Bootstrap, jQuery, and moment.js. The application features a daily planner that displays the current date using moment.js and timeblocks for standard business hours that are dynamically created using jQuery and Bootstrap. Each block is color coded to indicate whether it is in the past (grey), present (red), or future (green). Using moment.js and jQuery, this application contains a feature in which the schedule would automatically update the timeblock color at each hourly interval on the clock.

A user is able to add events to the schedule by clicking on the text field and entering an event. The user can then click the save button, which will save the event into local storage and diplay a message indicating that the event has been saved successfully. When the user refreshes the page, the scheduler will then check for any saved events in local storage and display them in their respective timeblocks.

## The following image depicts a screenshot of the completed work day scheduler

![Screenshot of work day scheduler](./assets/images/Screenshot-Work-Day-Scheduler)

## The following links are for the git repository and application:

* [Link to GitHub repository](https://github.com/kt946/work-day-scheduler)

* [Link to GitHub deployed application](https://kt946.github.io/work-day-scheduler/)