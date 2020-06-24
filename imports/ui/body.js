import {Template} from 'meteor/templating';
import {Tasks} from '../api/tasks.js';
import {Meteor} from 'meteor/meteor';

import {ReactiveDict} from 'meteor/reactive-dict';
import './task.js'
import './body.html';

//ReactiveDict
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        }
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
    },
    incompleteCount() {
        return Tasks.find({checked: {$ne: true}}).count();
    },
});

//Collection Task Creation
Template.body.events({
    'submit .new-task'(event) {
        // prevent default browser form submit
        event.preventDefault();

        // get value from element
        const target = event.target;
        const text = target.text.value;
        console.log(event);

        // insert a task in to the collection
        // here we are creating and modifying our DB, and
        // specifically our collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.user(),
            username: Meteor.user().username,
        })
        console.log(Meteor.user());

        // clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
})