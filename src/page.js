module.exports = [
	{
		title: "快快优车-让车更有价值",
		filename: "index.html",
		template: "views/index.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"index"],
		hash: true,
		cache: true
	},
	{
		title: "404",
		filename: "404.html",
		template: "views/404.ejs", 
		chunks:["z-lib/jquery","404"],
		hash: true,
		cache: true
	},
	{
		title: "共享租车",
		filename: "kkzc.html",
		template: "views/kkzc.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"kkzc"],
		hash: true,
		cache: true
	},
	{
		title: "长租",
		filename: "longrent.html",
		template: "views/longrent.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"longrent"],
		hash: true,
		cache: true
	},
	{
		title: "爱车放租",
		filename: "rent.html",
		template: "views/rent.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"rent"],
		hash: true,
		cache: true
	},
	{
		title: "车辆托管",
		filename: "trust.html",
		template: "views/trust.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"trust"],
		hash: true,
		cache: true
	},
	{
		title: "短租",
		filename: "shortrent.html",
		template: "views/shortrent.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"shortrent"],
		hash: true,
		cache: true
	},
	{
		title: "车辆详情",
		filename: "cardetail.html",
		template: "views/cardetail.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"cardetail"],
		hash: true,
		cache: true
	},
	{
		title: "汽车金融",
		filename: "carloan.html",
		template: "views/carloan.ejs", 
		chunks:["z-lib/jquery",'z-lib/i-swiper',"carloan"],
		hash: true,
		cache: true
	},
	{
		title: "帮助中心",
		filename: "help.html",
		template: "views/help.ejs", 
		chunks:["z-lib/jquery","help"],
		hash: true,
		cache: true
	},
	{
		title: "汽车金融SaaS系统",
		filename: "saas.html",
		template: "views/saas.ejs", 
		chunks:["saas"],
		hash: true,
		cache: true
	},
	{
		title: "体验店",
		filename: "shop.html",
		template: "views/shop.ejs", 
		chunks:["z-lib/jquery","shop"],
		hash: true,
		cache: true
	}
];