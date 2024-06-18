export default function Contributors({ display = true }) {
  const infoCards = [
    {
      title: "Binh Nguyen",
      text: "Front End Intern 2024",
      img: "",
      alt: "headshot",
    },
    {
      title: "Francis Nguyen",
      text: "Front End Intern 2024",
      img: "images/contributors/francis_nguyen.jpg",
      alt: "headshot",
    },
    {
      title: "Frank Mundo",
      text: "Front End Intern 2024",
      img: "",
      alt: "headshot",
    },
    {
      title: "Joel Zapana",
      text: "Front End Intern 2024",
      img: "images/contributors/joel_zapana_test.jpg",
      alt: "headshot",
    },
    {
      title: "Andy Troung",
      text: "Front End Intern 2022",
      img: "images/contributors/andy_truong.jpeg",
      alt: "headshot",
    },
    {
      title: "Bishal Nayak",
      text: "Civil Intern 2021",
      img: "images/contributors/bishal_nayak.jpg",
      alt: "headshot",
    },
    {
      title: "Brandon Xu",
      text: "Civil Intern 2020",
      img: "images/contributors/brandon_xu.jpeg",
      alt: "headshot",
    },
    {
      title: "Camille Lerasan",
      text: "Civil Intern 2022",
      img: "images/contributors/camille_lerasan.jpeg",
      alt: "headshot",
    },
    {
      title: "Christy Yuen",
      text: "Front End Intern 2023",
      img: "images/contributors/christy_yuen.png",
      alt: "headshot",
    },
    {
      title: "Jerry Wu",
      text: "Front End Intern 2022",
      img: "images/contributors/jerry_wu.jpg",
      alt: "headshot",
    },
    {
      title: "Jose Hernandez",
      text: "Civil Intern 2020",
      img: "images/contributors/jose_hernandez.jpg",
      alt: "headshot",
    },
    {
      title: "Julia Lu",
      text: "CIvil Intern 2020",
      img: "images/contributors/julia_lu.jpeg",
      alt: "headshot",
    },
    {
      title: "Kaier Lao",
      text: "Civil Intern 2020",
      img: "images/contributors/kaier_lao.jpeg",
      alt: "headshot",
    },
    {
      title: "Kanchan Mhatre",
      text: "Front End Intern 2023",
      img: "images/contributors/kanchan_mhatre.png",
      alt: "headshot",
    },
    {
      title: "Myron Zhou",
      text: "Front End Intern 2022",
      img: "images/contributors/myron_zhou.jpg",
      alt: "headshot",
    },
    {
      title: "Ramesh Pothamsetty",
      text: "Front End Intern 2023",
      img: "images/contributors/ramesh_pothamsetty.jpeg",
      alt: "headshot",
    },
    {
      title: "Ramneet Sidhu",
      text: "Civil Intern 2020",
      img: "images/contributors/ramneet_sidhu.jpeg",
      alt: "headshot",
    },
    {
      title: "Rebecca Castro",
      text: "Civil Intern 2021",
      img: "images/contributors/rebecca_castro.jpeg",
      alt: "headshot",
    },
    {
      title: "Rembrandt Fernandez",
      text: "Civil Intern 2020",
      img: "images/contributors/rembrandt_fernandez.jpg",
      alt: "headshot",
    },
    {
      title: "Sophie Huang",
      text: "Front End Intern 2020",
      img: "images/contributors/sophie_huang.jpg",
      alt: "headshot",
    },

  ];

    return (
      <main className="container mx-auto mt-4 p-4">
        <div className="container max-h-full mx-auto mt-4 p-4">
          <h1 className="text-4xl text-left text-slate-700 font-medium mb-2 mx-6 mt-6 font-sans tracking-wide">
            Community Powered.
          </h1>
          <div className="p-4">
            <img
              src="/images/contributors/group_6207.JPG"
              alt="Group in front of Library"
              className="m-auto w-full"
            />
          </div>
          <p className="text-xl text-left font-medium mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Civil Engineering is community based, so are we.
          </p>
        </div>
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Contributors
          </h2>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoCards.map((item, index) => (
              <div
                key={`infoCard${index}`}
                className="container rounded-md mx-auto mt-4 p-4"
              >
                <div className="p-4">
                  <figure>
                    <img
                      className="w-60 rounded-full md:h-full flex m-auto pt-2"
                      alt={item.alt}
                      src={item.img}
                    />
                    <div className="mt-4">
                      <h2 className="font-medium font-sans tracking-wide text-xl text-slate-700">
                        {item.title}
                      </h2>
                      <p className="text-sm text-slate-700">{item.text}</p>
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 font-sans tracking-wide text-slate-700">
            Leadership
          </h2>
          <div className="p-4 flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="container rounded-md mx-auto mt-4 p-4">
              <div className="p-4">
                <img
                  src="/images/contributors/ann_do.jpg"
                  alt="headshot Annie"
                  className="w-60 rounded-full md:h-80 md:w-80 flex m-auto pt-2"
                />
                <div className="container rounded-md mx-auto mt-4 p-4">
                  <div className="p-4">
                    <h1 className="text-2xl font-sans tracking-wide text-slate-700">
                      Ann Do
                    </h1>
                    <p className="text-lg text-slate-700">Project Manager</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container rounded-md mx-auto mt-4 p-4">
              <div className="p-4">
                <img
                  src="/images/contributors/seij_de_leon.jpg"
                  alt="headshot Seij"
                  className="w-60 rounded-full md:h-80 md:w-80 flex m-auto pt-2"
                />
                <div className="container rounded-md mx-auto mt-4 p-4">
                  <div className="p-4">
                    <h1 className="text-2xl font-sans tracking-wide text-slate-700">
                      Seij De Leon, PE
                    </h1>
                    <p className="text-lg text-slate-700">Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container items-center mx-auto mt-4 p-4">
          <h2 className="text-4xl text-left font-medium mt-6 mb-2 mx-6 text-slate-700 font-sans tracking-wide">
            Interested in Joining?
          </h2>
          <div className="container flex justify-center items-center mx-auto mt-4 p-4">
            <div className="flex flex-col justify-center md:w-8/12 md:h-8/12 relative ">
            <a target='_blank' rel='noopener noreferrer' className='' href='https://www.linkedin.com/in/seij-de-leon/' >
              <button className="flex justify-center items-center mx-auto mt-6 mb-6 py-6 w-52 h-20 bg-sky-400 hover:bg-sky-500 outline outline-offset-2 outline-slate-300 rounded-lg text-white font-bold font-sans tracking-wider">
                Contact us
              </button>
              </a>
              <div className="text-black text-left text-2xl text-slate-700 font-sans tracking-wider p-4">
                California Seismic is an open source project with opportunities
                in technical writing, problem creation, front end development,
                video editing, and more! If you would like to learn more about
                ways you could contribute please reach out to Seij on LinkedIn.
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }