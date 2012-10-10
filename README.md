This was created to be able to add a custom header in nestedlists with a share button to publish the content of the sublists' page on facebook/twitter. Can be used for anything where you need a custom header in a nested list subpage.



Load this file after jquery mobile

<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
<script src="javascript/jquery.mobile.nested-listview-noheaders.js"></script>



And add this attribute to the nested lists where you don't want a header

<ul data-role="listview" data-noheaders="true">



This can be useful if you manage your nested lists with a templating engine (mustache, handlebars, underscore, etc).
You can then do so : 

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>Demo</title>
   
    <link rel="stylesheet" href="jquery.mobile-1.1.1.min.css"/>
    <link rel="stylesheet" href="jquery.mobile.iscrollview.css"/>
    <link rel="stylesheet" href="jquery.mobile.iscrollview-pull.css"/>
    <link rel="stylesheet" href="additional-site-specific-styles.css"/>
    
    <script src="jquery-1.7.1.min.js"></script>
    <script src="jquery.mobile-1.1.1.min.js"></script>
    <script src="iscroll.js"></script>
    <script src="jquery.mobile.iscrollview.js"></script>
    <script src="additional-site-specific-scripts.js"></script>
  </head>

  <body>
    <div data-role="page" id="index-page">
    
      <div data-role="header" data-position="fixed" data-tap-toggle="false">
        <h1>INDEX PAGE</h1>
      </div>
      
      <div data-role="content" class="example-wrapper" data-iscroll>
        <p>some content that will be scrolled</p>
        <p>Some more content that will be scrolled</p>
        <ul data-role="listview">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <p>Even more content. It will scroll whatever is in the data-iscroll div.</p>
      </div>
      
      <div data-role="footer" data-position="fixed" data-tap-toggle="false">
        <h1>My Footer</h1>
      </div>
      
    </div>
  </body>
</html>
```