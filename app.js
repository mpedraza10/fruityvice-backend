const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.get("/generate-csv", async (req, res) => {
	const apiUrl = "https://fruityvice.com/api/fruit/all/";

	try {
		const response = await axios.get(apiUrl);

		res.json(response.data);
	} catch (error) {
		console.error("Error proxying request:", error);
		res
			.status(500)
			.json({ error: "An error occurred while proxying the request." });
	}
});

app.get("/generate-csv/:filter/:name", async (req, res) => {
	const filter = req.params.filter;
	const filterName = req.params.name;

	let apiUrl = "https://fruityvice.com/api/fruit/all/";

	if (filter === "family") {
		apiUrl = `https://fruityvice.com/api/fruit/family/${filterName}`;
	} else if (filter === "genus") {
		apiUrl = `https://fruityvice.com/api/fruit/genus/${filterName}`;
	} else if (filter === "order") {
		apiUrl = `https://fruityvice.com/api/fruit/order/${filterName}`;
	}

	try {
		const response = await axios.get(apiUrl);

		res.json(response.data);
	} catch (error) {
		console.error("Error proxying request:", error);
		res
			.status(500)
			.json({ error: "An error occurred while proxying the request." });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
