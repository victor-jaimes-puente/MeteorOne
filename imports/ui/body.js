import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
    tasks() {
        return Tasks.find({});
    },
});
Template.body.events({
    'submit .new-task'(event){
        // prevent default browser form submit
        event.preventDefault();

        // get value from element
    }
})