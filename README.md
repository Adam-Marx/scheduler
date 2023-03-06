# Interview Scheduler
Interviewer Scheduler uses React, its purpose being to schedule interviews between students and interviewers. 

Users can add new appointments first by checking which days have empty spots available, then clicking on the plus symbol. This will bring up a form where the user can input the student name and select the interviewer available on that day and time. Users can also edit and delete appointments that have been created, with the webapp succesfully updating the spots remaining in the case of either of those actions.

Since I was using React, all of the components have their own files, teaching me how to use props, hooks, and JSX.

*The home page, hovering over one of the appointment to reveal delete and edit buttons.*
![root](https://github.com/Adam-Marx/scheduler/blob/master/README_screenshots/Scheduler_01.png?raw=true)


*Confirmation prompt for deleting appointment*
![deleting](https://github.com/Adam-Marx/scheduler/blob/master/README_screenshots/Scheduler_02.png?raw=true)


*The form to create/edit a new appointment. There must be both a student name and interviewer selected for the appointment to be created.*
![form](https://github.com/Adam-Marx/scheduler/blob/master/README_screenshots/Scheduler_03.png?raw=true)


## Thoroughly Tested

This webapp was also a learning grounds for my knowledge of testing logic and React components using the Testing Library's react library.

This entailed using unit tests, integration testing, as well as end-to-end testing with Cypress, the last of which was brand new to me.

The files have a 98% testing coverage score, with 7 test suites and 44 tests.

## Setup

Install dependencies with `npm install`.

- axios version 0.20.0
- classnames version 2.2.6
- normalize.css version 8.0.1
- React version 16.9.0
- React-DOM version 16.9.0
- react-scripts version 3.4.4

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
