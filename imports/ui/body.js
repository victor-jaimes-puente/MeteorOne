import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
    tasks() {
        return Tasks.find({}, {sort: {createdAt: -1 }});
    },
});
Template.body.events({
    'submit .new-task'(event){
        // prevent default browser form submit
        event.preventDefault();

        // get value from element
        const target = event.target;
        const text = target.text.value;
        console.log(event);

        // insert a task in to the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        })

        // clear form
        target.text.value = '';
    }
})