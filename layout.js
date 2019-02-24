const { apiCall } = require('./helpers')
const airtable_key = process.env.AIRTABLE_KEY
const content = require("./content")

module.exports = async function (lang, index=false) {
  
  let c // c = content
  if (lang === "en") {
    c = content.en
  }
  if (lang === "ru") {
    c = content.ru
  }

  // generate_content
  const content_otd = async () => {
    // test // const response = await apiCall("https://jsonplaceholder.typicode.com/todos/1", "GET") 

    try {
      const response = await apiCall("https://api.airtable.com/v0/"+c.airtable_base_id+"/Table%201?maxRecords=1&view=Grid%20view", "GET", null, { authorization_key: airtable_key })
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

  return /*html*/ String.raw`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${c.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href=${index ? "styles.css" : "../styles.css"}>
      </head>

      <body>

        <div style="text-align: center;">

          <div>
            <a href="/en"> EN </a> | <a href="/ru"> RU </a>
          </div>

          <h1 style="font-size: 20px;">${c.title}</h1>

          <div class="outer-embed-wrapper">
            <div class="embed-container">
              <iframe src="${await content_otd()}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

              <!-- Embedly has it without recomnded and more similar videos -->
              <!-- <iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FCqm0hbXf2d0%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCqm0hbXf2d0&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCqm0hbXf2d0%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube" width="500" height="281" scrolling="no" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe> -->

            </div>
          </div>

          <p>${c.subtitles_info}</p>

          <h2 style="font-size: 15px;">
              <div>
                <a href="https://calendar.google.com/event?action=TEMPLATE&tmeid=NWtoZTFmYmtsaHFyOTFtMWk1N2tsNWY4YjJfMjAxOTAyMjFUMTcwMDAwWiBhYmR0M2lxam5ndGdhazlzZThxZGx1bGY1a0Bn&tmsrc=abdt3iqjngtgak9se8qdlulf5k%40group.calendar.google.com&scp=ALL" target="_blank">
                  <img style="border-radius: 5px;" src=${index ? c.save_to_g_calendar_img : "../"+c.save_to_g_calendar_img} />
                </a>
              </div>
              <!-- or a material btn -->
              <!-- <button class="btn blue" type="button"><span>Save</span></button> -->
              <!-- SAVE -->
             ${c.save_to_g_calendar_txt}
          </h2>

          <h2 style="font-size: 15px;">${c.encouragement}</h2>

          <div>. . .</div>
          <br>

          <div class="links">

            <div>
              <a href=${c.yt_list_url} target="_blank"> ${c.yt_list} </a>
            </div>
  
            <div>
              <a href=${c.past_videos_url} target="_blank"> ${c.past_videos} </a>
            </div>
  
            <div>
              <a><a href="https://github.com/zalab-co?utf8=%E2%9C%93&q=hypatia" target="_blank"> ${c.oss} </a>
            </div>

            <div>
              <a><a href="https://www.zalab.co" target="_blank"> ${c.madeBy} </a>
            </div>
            
          </div>

        </div>

      </body>
    </html>
  `;

};