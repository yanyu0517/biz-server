'use strict';

var httpServer = require('http-server'),
	argv       = require('optimist')
				.boolean('cors')
			    .argv;

if (argv.h || argv.help) {
  console.log([
    'usage: biz-server [path] [options]',
    '',
    'options:',
    '  -p           Port to use [8080]',
    '  -a           Address to use [0.0.0.0]',
    '  -d           Show directory listings [true]',
    '  -i           Display autoIndex [true]',
    '  -e --ext     Default file extension if none supplied [none]',
    '  -s --silent  Suppress log messages from output',
    '  --cors[=headers]   Enable CORS via the "Access-Control-Allow-Origin" header',
    '                     Optionally provide CORS headers list separated by commas',
    '  -o [path]    Open browser window after starting the server',
    '  -c           Cache time (max-age) in seconds [3600], e.g. -c10 for 10 seconds.',
    '               To disable caching, use -c-1.',
    '  -U --utc     Use UTC time format in log messages.',
    '',
    '  -P --proxy   Fallback proxy if the request cannot be resolved. e.g.: http://someurl.com',
    '',
    '  -S --ssl     Enable https.',
    '  -C --cert    Path to ssl cert file (default: cert.pem).',
    '  -K --key     Path to ssl key file (default: key.pem).',
    '',
    '  -r --robots  Respond to /robots.txt [User-agent: *\\nDisallow: /]',
    '  -h --help    Print this list and exit.'
  ].join('\n'));
  process.exit();
}


exports.BizServer = BizServer;

exports.startBizServer = function(options){
	return new BizServer(options || {})
}

function BizServer(options){
	this.server = httpServer.createServer(options);
}
