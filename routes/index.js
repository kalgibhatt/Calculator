var express = require('express');
var router = express.Router();
/*
 * GET home page.
 */

router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Calculator' });
	});

router.post('/calculate',function(req,res,next) {
	
	var result;
	var num1 = Number(req.body.val1);
	var num2 = Number(req.body.val2);
	var operator = req.body.operator;
	if(operator === '+')
	{
		result = num1 + num2;
	}
	else if(operator === '-')
	{
		result = num1 - num2;
	}
	else if(operator === '×')
	{
		result = num1 * num2;
	}
	else if(operator === '÷')
	{
		result = num1 / num2;
	}
	res.send({
			"result": result
	});
});

module.exports = router;

