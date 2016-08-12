$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //used forEach to iterate through every single item,
        //for loop is better to stop the loop when we 
        //found what we are searching for - 'for' makes more difficult to read the code.

        it('URL is defined and not empty', function() {
          allFeeds.forEach(function(feed) {
            //checks if url is defined
            expect(feed.url).toBeDefined();
            //checks if url it is not empty
            expect(feed.url).toBeTruthy();
          });
        });   
        it('name is defined and not empty', function() {
          allFeeds.forEach(function(feed) {
            //checks if name is defined
            expect(feed.name).toBeDefined();
            //checks if name is not empty
            expect(feed.name).toBeTruthy();
          });
        });
    });

    describe('The menu', function() {
        it('menu element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        describe('toggle menu', function(){
            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });
            // When menu first clicked
            it('menu first clicked - visible', function() {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            });
            // When menu clicked again            
            it('menu next click - hidden', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
    });
    describe('Initial Entries', function() {
        beforeEach(function(done) {
        // Loads the first feed (index of 0).
        //done(); - the async request is complete and can move on from the beforeEach
            loadFeed(0, done);
        });
        it('loadFeed not empty', function() {
            expect($('.feed .entry').length).not.toBe(0);
        //done passed as a parameter - needs to call
        });
    });
    describe('New Feed Selection', function() {
        var entryAfterChange;
        beforeEach(function (done) {
            // Loads the first feed (index of 0)
            loadFeed(0, function() {
            //assign $('.feed').html() to variable entryAfterChange
            entryAfterChange = $('.feed').html();
            //Loads the third feed (index of 2)
            loadFeed(2, done);
            });
        });

        it('new feed loaded - content changes', function () {
            //entries should be different after loadFeed completes
            expect($('.feed').html()).not.toEqual(entryAfterChange);
        });

        //afterAll function is called after all specs finish - requires a reset to the original state, jumps back to the first feed.
        afterAll(function (done) {
        // Loads the first feed (index of 0).
            loadFeed(0, done);
        });
    });
}());
