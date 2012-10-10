var listCountPerPage = {};
$.mobile.listview.prototype._createSubPages = function() {
		var parentList = this.element,
			parentPage = parentList.closest( ".ui-page" ),
			parentUrl = parentPage.jqmData( "url" ),
			parentId = parentUrl || parentPage[ 0 ][ $.expando ],
			parentListId = parentList.attr( "id" ),
			o = this.options,
			dns = "data-" + $.mobile.ns,
			self = this,
			persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" ),
			hasSubPages;

		if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
			listCountPerPage[ parentId ] = -1;
		}

		parentListId = parentListId || ++listCountPerPage[ parentId ];

		$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function( i ) {
			var self = this,
				list = $( this ),
				listId = list.attr( "id" ) || parentListId + "-" + i,
				parent = list.parent(),
				nodeElsFull = $( list.prevAll().toArray().reverse() ),
				nodeEls = nodeElsFull.length ? nodeElsFull : $( "<span>" + $.trim(parent.contents()[ 0 ].nodeValue) + "</span>" ),
				title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
				id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
				theme = list.jqmData( "theme" ) || o.theme,
				countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
				newPage, anchor;

			//define hasSubPages for use in later removal
			hasSubPages = true;

			// This function creates pages with a new header following the 'b' theme.
			var noheadersPages = function (lv) {
			    return lv.detach()
                            .wrap( "<div " + dns + "role='page' " + dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
                            .parent()
                                // .before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
                                .after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>" ) : "" )
                                .parent()
                                    .appendTo( $.mobile.pageContainer );
			};

			// This function clones the header and footer of the parent page.
			var headersPages = function (lv) {
			    return lv.detach()
                            .wrap( "<div " + dns + "role='page' " + dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
                            .parent()
                                .before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
                                .after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='"+ persistentFooterID +"'>" ) : "" )
                                .parent()
                                    .appendTo( $.mobile.pageContainer );
			};

			// Set the data-dynamic attribute on the parent list (<ul>) to choose.
			// It would be nice to make this an user-callback so you're not restricted to these options.
			var noheaders = parentList.jqmData('noheaders') == true;
			// Callback a user-supplied function if there is one.
			newPage = noheaders ? noheadersPages(list) : headersPages(list);
			newPage.page();

			anchor = parent.find( 'a:first' );

			if ( !anchor.length ) {
				anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
			}

			anchor.attr( "href", "#" + id );

		}).listview();

		// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
		// and aren't embedded
		if ( hasSubPages &&
			parentPage.is( ":jqmData(external-page='true')" ) &&
			parentPage.data( "page" ).options.domCache === false ) {

			var newRemove = function( e, ui ) {
				var nextPage = ui.nextPage, npURL,
					prEvent = new $.Event( "pageremove" );

				if ( ui.nextPage ) {
					npURL = nextPage.jqmData( "url" );
					if ( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ) {
						self.childPages().remove();
						parentPage.trigger( prEvent );
						if ( !prEvent.isDefaultPrevented() ) {
							parentPage.removeWithDependents();
						}
					}
				}
			};

			// unbind the original page remove and replace with our specialized version
			parentPage
				.unbind( "pagehide.remove" )
				.bind( "pagehide.remove", newRemove);
		}
	};