This was created to be able to add a custom header in nestedlists with a share button to publish the content of the sublists' page on facebook/twitter. Can be used for anything where you need a custom header in a nested list subpage.



Load this file after jquery mobile

<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
<script src="javascript/jquery.mobile.nested-listview-noheaders.js"></script>



And add this attribute to the nested lists where you don't want a header

<ul data-role="listview" data-noheaders="true">



This can be useful if you manage your nested lists with a templating engine (mustache, handlebars, underscore, etc).
You can then do so : 

	<li>
        <h3> {{someTitle}} </h3>
        <ul>
              <div data-role="header" data-position="fixed">
                    <a href="#" data-icon="back" data-rel="back" data-icon="back">Back</a>
					<h1> {{someTitle}} </h1> 
					<a href="#" onclick="publishStory()" data-icon="custom">Share</a>
              </div>
              <li>{{someContent}}</li>
        </u l>
    </li>
