const { apiCall } = require('./helpers')
const airtable_key = process.env.AIRTABLE_KEY

const content_otd = async () => {
  // test // const response = await apiCall("https://jsonplaceholder.typicode.com/todos/1", "GET") 

  try {
    const response = await apiCall("https://api.airtable.com/v0/appDhlDCzW5NfMuve/Table%201?maxRecords=1&view=Grid%20view", "GET", null, { authorization_key: airtable_key })
    // console.log("response", response)
    const ytVideoURL = response.records[0].fields.url
    const embedYTurl = ytVideoURL.replace("watch?v=", "embed/")
    // console.log(embedYTurl)
    return embedYTurl
  }
  catch (err) {
    console.log("err", err)
  }

  // while developing
  // return "https://www.youtube.com/embed/Cqm0hbXf2d0"
}

// // to get lit-html extension highlighting you can do
// function html(string) {
//   return string
// }
// html``

module.exports = async function (data) {
  return /*html*/ String.raw`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Hypatia - She'll teach you things. Get an educational & entertaining YouTube video daily.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="styles.css">
      </head>

      <body>

        <div style="text-align: center;">

          <h1 style="font-size: 20px;">Hypatia - She'll teach you things. Get an educational & entertaining YouTube video daily.</h1>

          <div class="outer-embed-wrapper">
            <div class="embed-container">
              <iframe src="${await content_otd()}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

              <!-- Embedly has it without recomnded and more similar videos -->
              <!-- <iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FCqm0hbXf2d0%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCqm0hbXf2d0&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCqm0hbXf2d0%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube" width="500" height="281" scrolling="no" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe> -->

            </div>
          </div>

          <h2 style="font-size: 15px;">
            <a href="https://calendar.google.com/event?action=TEMPLATE&tmeid=NWtoZTFmYmtsaHFyOTFtMWk1N2tsNWY4YjJfMjAxOTAyMjFUMTcwMDAwWiBhYmR0M2lxam5ndGdhazlzZThxZGx1bGY1a0Bn&tmsrc=abdt3iqjngtgak9se8qdlulf5k%40group.calendar.google.com&scp=ALL" target="_blank">
            
              <div style="width: 80px; height: 36px; margin: auto;">
                <img style="border-radius: 5px;" src="imgs/save-to-g-calendar.PNG" />
              </div>
              <!-- or a material btn -->
              <!-- <button class="btn blue" type="button"><span>Save</span></button> -->
              <!-- SAVE -->
            </a> a reminder notification to your Google Calendar
          </h2>

          <div class="links">

            <div>
              <a href="https://docs.google.com/spreadsheets/d/1Afa2sqOfw-pBpZLoQ357t5y4_lQQ6Fz9IFUSmZRnlMU/edit" target="_blank">List of YouTube channels</a>
            </div>
  
            <div>
              <a href="https://airtable.com/shrVWrE12Oy5H9uAI/tbl6CyxfYjLwfcHyN/viwCzD7j3jUf21Or9" target="_blank">Past videos</a>
            </div>
  
            <div>
              <a><a href="https://github.com/zalab-co?utf8=%E2%9C%93&q=hypatia" target="_blank">It's open source on GitHub</a>
            </div>

            <div>
              <a><a href="https://www.zalab.co" target="_blank">Made by ZALAB</a>
            </div>
            
          </div>

        </div>

      </body>
    </html>
  `;
};