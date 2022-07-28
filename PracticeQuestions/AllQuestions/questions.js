"use strict";
(function () {
  const QUESTIONS_URL = "problems.json";
  const ANSWER_CHOICES = ["A", "B", "C", "D"];
  const PROBLEMS_PICS_FOLDER = "../problem_pics/";
  const ERROR_IMG = "../problem_pics/error.png";

  window.addEventListener("load", init);

  /**
   * Runs once the page loads
   */
  function init() {
    fetchProblems();
  }

  /**
   * Fetches all sample practice problems
   */
  function fetchProblems() {
    fetch(QUESTIONS_URL)
      .then(res => res.json())
      .then(displayData)
      .catch(console.error)
  }

  /**
   * Populates the DOM tree with problems
   * @param {object} response - response with problem data in JSON form.
   */
  function displayData(response) {
    let body = document.querySelector("section.practiceQuestionBody");
    for (let i = 0; i < response.length; i++) {
      let questionWrapper = gen('div');
      questionWrapper.className = "questionBoxWrapper";
      let question = gen('div');
      question.className = "questionBox";
      let h1Tag = gen('h1');
      h1Tag.textContent = "#" + response[i].problem_name;
      let pTag = gen('p');
      pTag.textContent = response[i].desc;
      let container = gen('div');
      container.className = "container";
      let answerOptions = createAnswers(response[i].answer, JSON.parse(response[i].answers), response[i].problem_name);
      container.append(answerOptions);
      if ("problem_pic" in response[i]) {
        let imageContainer = gen('div');
        imageContainer.className = "imgContainer";
        let image = createImgTag(JSON.parse(response[i].problem_pic));
        imageContainer.append(image);
        container.append(imageContainer);
      }
      let solutionID = "s" + response[i].problem_name;
      let btn = gen('button');
      btn.className = "questionSolutionButton";
      btn.textContent = "Solution:";
      let solutionDesc = gen('div');
      solutionDesc.classList.add("questionSolution");
      solutionDesc.id = solutionID;
      btn.addEventListener('click', function () {
        solutionDesc.classList.toggle("visible");
      });
      let desc = gen('p');
      desc.textContent = response[i].answer_desc;
      solutionDesc.append(desc);
      question.append(h1Tag, pTag, container, btn, solutionDesc);
      questionWrapper.append(question);
      body.appendChild(questionWrapper);
    }
  }

  /**
   * Returns a list of answer options for the given question
   * @param {String} answer - answer to the question
   * @param {Array} answerArray - array of answer options
   * @param {String} questionNum - current question number
   * @returns {object} New DOM object containing problem choices
   */
  function createAnswers(answer, answerArray, questionNum) {
    let list = gen('ul');
    list.className = "questionList";
    for (let i = 0; i < answerArray.length; i++) {
      let listItem = gen('li');
      let answerChoice = gen('a');
      answerChoice.classList.add("hoverAnswer");
      answerChoice.id = "q" + questionNum + ANSWER_CHOICES[i];
      answerChoice.textContent = ANSWER_CHOICES[i] + ": " + answerArray[i];
      answerChoice.addEventListener('click', function (event) {
        let curr = event.target.textContent;
        let currAnswer = curr.substring(curr.indexOf(' ') + 1);
        event.target.style.backgroundColor = currAnswer === answer.toString() ? "#a9fca7" : "#ff7373";
      });
      listItem.append(answerChoice);
      list.append(listItem);
    }
    return list;
  }

  /**
   * Creates and returns image tag from source url if successful, otherwise
   * returns a temporary no image available placeholder
   * @param {String} image - image URL for the given problem
   * @returns {object} New DOM object with image.
   */
  function createImgTag(image) {
    let imgTag = gen('img');
    imgTag.className = "problemPic";
    let imgSrc = PROBLEMS_PICS_FOLDER.concat(image.src);
    let urlStatus = urlExists(imgSrc)
    urlStatus.then((res) => {
      if(res === 200) {
        imgTag.src = imgSrc;
        imgTag.alt = image.alt;
      } else {
        imgTag.src = ERROR_IMG;
        imgTag.alt = "No image available";
      }
    });
    return imgTag;
  }

  /**
   * Fetches and returns a 200 response status if successful, otherwise
   * prints out error
   * @param {String} url - image URL for the given problem
   * @returns Promise object containing the status code for the response
   */
  function urlExists(url) {
    return fetch(url)
      .then(checkStatus)
      .then((res) => {
        return res.status;
      }).catch(console.error);
  }


  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function checkStatus(res) {
    if (!res.ok) {
      const err = new Error("Not 2xx response");
      err.response = res;
      throw err;
    }
    return res;
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();