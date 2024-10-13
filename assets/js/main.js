/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// =========== 必要修改项 =============
let DefaultName = "REH";  // Important !!!!!!!!!!!!!!!!!!!!!!!===!!!!!!!!!!!!!!!!!!!!!!!!!!!
let Birthday_date = "10/13";
// =========!!!!!!!!!!!!!!!!=========

document.getElementById("userName").value=DefaultName;
document.getElementById("Birthday_Date").innerHTML=Birthday_date;
document.title = "Happy Birthday ! | " + Birthday_date

var currentTime = 0;
var music = document.getElementById("bgMusic");

const loading = {
	container: document.querySelector(".loading"),
	in(target) {
		this.container.classList.remove("loading_out");
		setTimeout(() => {
			window.location.href = target;
		}, 1000)
	},
	out() {
		this.container.classList.add("loading_out");
	}
};

	loading.out();


// ============================ 随机背景 ==================================
let pics = ["bg", "p01", "p02", "p03", "p04", "p05"];
// 生成一个介于0到list.length-1之间的随机索引值
let randomIndex = Math.floor(Math.random() * pics.length);
// 根据随机索引获取相应位置上的元素
let picSc = pics[randomIndex];
let pat = "#bg:after{background-image:url(\"../../images/" + picSc + ".jpg\");}";
let stl = document.createElement("style")
stl.innerHTML =
	'#bg:after {\n' +
	'\t\t\t-moz-transform: scale(1.125);\n' +
	'\t\t\t-webkit-transform: scale(1.125);\n' +
	'\t\t\t-ms-transform: scale(1.125);\n' +
	'\t\t\ttransform: scale(1.125);\n' +
	'\t\t\t-moz-transition: -moz-transform 0.325s ease-in-out, -moz-filter 0.325s ease-in-out;\n' +
	'\t\t\t-webkit-transition: -webkit-transform 0.325s ease-in-out, -webkit-filter 0.325s ease-in-out;\n' +
	'\t\t\t-ms-transition: -ms-transform 0.325s ease-in-out, -ms-filter 0.325s ease-in-out;\n' +
	'\t\t\ttransition: transform 0.325s ease-in-out, filter 0.325s ease-in-out;\n' +
	'\t\t\tbackground-image:url("./images/'+picSc+'.jpg");\n' +
	'\t\t\tbackground-position: center;\n' +
	'\t\t\tbackground-size: cover;\n' +
	'\t\t\tbackground-repeat: no-repeat;\n' +
	'\t\t\tz-index: 1;\n' +
	'\t\t}'
document.head.appendChild(stl)

// 监听音乐播放事件
music.addEventListener("timeupdate", function() {
	currentTime = music.currentTime;
});

// 监听页面离开事件
window.addEventListener("beforeunload", function() {
	sessionStorage.setItem("currentTime", currentTime);

});

// 监听页面加载事件
window.addEventListener("load", function() {
	var storedTime = sessionStorage.getItem("currentTime");
	if (storedTime) {
		music.currentTime = parseFloat(storedTime);
		music.play();
	}
});

$("#music_stop").click(function (event) {
	music.pause()
});

$("#music_replay").click(function (event) {
	music.currentTime = 0;
	music.play();
});


$("#login-button").click(function (event) {
	var name = document.getElementById("userName").value;
	console.log(name);
	if(name=="gbvjs4u09rdj1f9ef74o7lgnrr" || name==""){name='寿星'}
	loading.in("view.html?"+'nickname='+name);
	// location.href = "main.html?"+'nickname='+name


});
$("#button_about").click(function (event) {
	var userName = document.getElementById("userName").value;
	if(userName==''){userName='寿星'}
	document.getElementById("usName").innerHTML=", "+userName
});
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							var referrer =  document.referrer;
							a = referrer.slice(referrer.indexOf("main.html")-6);
							b = a.substring(0,6)
							if (b=="level/"){
								history.back(-1);};
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {
				var referrer =  document.referrer;
				a = referrer.slice(referrer.indexOf("main.html")-6);
				b = a.substring(0,6)
				if (b=="level/"){
					history.back(-1);};

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);
