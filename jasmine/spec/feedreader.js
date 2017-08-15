/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test goes through each feed and makes sure that there is an URL present and that the URL is not empty */
        it('has a URL defined and the URL is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        /* This test goes through each feed and makes sure that there is a name present and that the name is not empty */
        it('has a name defined and the name is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
    /* This is the second test suite. This is about the menu to make sure it opens and closes as wanted */
    describe('The menu', function() {
        /* This test makes sure that the "menu" element is hidden by default */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        /* This test makes sure the visibility changes when the menu icon is clicked. One when it opens and one when it closes */
        it('changes visibility when menu icon is clicked', function() {
            // first to check if its opened on click
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            // then to check if its closed on click
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /* This is the third test suite. This is about making sure the first set of feed entries are all set */
    describe('Initial Entries', function() {
        /* This test makes sure that hte loadFeed function works when called and at at least a single ".entry" element is present in the ".feed" container
         * Since loadfeed() is asynchronous, we need to use "beforeEach" and "done()" provided by Jasmine for it to work */
        //call this function for asynchronous request
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //once the request is made, make sure that the loadfeed has returned at least one entry from the feed
        it('has a .entry element within the .feed container', function(done) {
            var entry = $('.feed .entry')[0];
            expect(entry).toBeGreaterThan(''); //if .entry[0] contains something, it would be greater than an empty string
            done();
        });
    });
    /* This is the fourth suite. This is about making sure a new feed is called and it replaces the old feed */
    describe('New Feed Selection', function() {
        /* This test makes sure that hte loadFeed function works when called and changes the content of the feed with new elements
         * Since loadfeed() is asynchronous, we need to use "beforeEach" and "done()" provided by Jasmine for it to work */
        //declare variables to save old and new feed data
        var prev_entries, new_entries;
        //call this function for asunchronous request
        beforeEach(function(done) {
            $('.feed').empty();
            //call the feed first to save it for comparision with the second call later
            loadFeed(0, function() {
                prev_entries = $('.feed').find("h2").text();
                done();
            });
        });
        it('changes content to the new feed content', function(done) {
            //now call the feed again for new content and save to new_entries and run comparision
            loadFeed(1, function() {
                new_entries = $('.feed').find("h2").text();
                expect(prev_entries).not.toEqual(new_entries);
                done();
            });
        });
    });
}());