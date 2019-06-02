require('dotenv').config({ path: './variables.env' });
const express = require('express');
// const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

let pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  forceTLS: true,
  cluster: process.env.PUSHER_APP_CLUSTER,
});

app.use(cors());
app.use(express.json());

// A http end-point for the index page
app.get('/', function(req, res) {
  res.status(200).send({ service: 'Pusher activity feed API' });
});

const titles = [];

// A http end-point for validating and processing users' posts.
app.post('/submit', (req, res) => {
	const title = req.body.title;
	const body = req.body.body;

  if (title === undefined) {
    res
      .status(400)
      .send({ message: 'Please provide your post title', status: false });
    return;
  }

  if (body === undefined) {
    res
      .status(400)
      .send({ message: 'Please provide your post body', status: false });
    return;
  }

  if (title.length <= 5) {
    res.status(400).send({
      message: 'Post title should be more than 5 characters',
      status: false,
    });
    return;
  }

  if (body.length <= 6) {
    res.status(400).send({
      message: 'Post body should be more than 6 characters',
      status: false,
    });
    return;
  }

	const index = titles.findIndex(element => {
    return element === title;
  });

	if (index >= 0) {
		res
			.status(400)
			.send({
				message: 'Post title already exists',
				status: false
		});
		return;
	}

	// if the users title has passed the above tests then it is added
	// to the titles array and the pusher real-time feed is actived.
	titles.push(title.trim());
	pusher.trigger('realtime-feeds', 'posts', {
		title: title.trim(),
		body: body.trim(),
		time: new Date(),
	});

	res
		.status(200)
		.send({
			message: 'Post was successfully created', 
			status: true
	});
});

app.listen(port, function() {
	console.log(`The server is running on port ${port}` );
});
