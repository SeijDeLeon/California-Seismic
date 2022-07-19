"use strict";
(function () {
  const QUESTIONS_URL = "problems.json";
  const ANSWER_CHOICES = ["A", "B", "C", "D"];

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
   * @param {promise} response - promise parameter
   */
  function displayData(response) {
    let body = document.querySelector("section.practiceQuestionBody");
    for(let i = 0; i < response.length; i++) {
      let questionWrapper = gen('div');
      questionWrapper.className = "questionBoxWrapper";
      let question = gen('div');
      question.className = "questionBox";
      let h1Tag = gen('h1');
      h1Tag.textContent = "#" + response[i].problem_name;
      let pTag = gen('p');
      pTag.textContent = response[i].desc;
      let answerOptions = createAnswers(response[i].answer, JSON.parse(response[i].answers), response[i].problem_name);
      let solutionID = "s" + response[i].problem_name;
      let btn = gen('button');
      btn.className = "questionSolutionButton";
      btn.textContent = "Solution:";
      let solutionDesc = gen('div');
      solutionDesc.classList = "questionSolution";
      solutionDesc.id = solutionID;
      btn.addEventListener('click', function() {
        solutionDesc.classList.toggle("visible");
      });
      let desc = gen('p');
      desc.textContent = response[i].answer_desc;
      solutionDesc.append(desc);
      question.append(h1Tag, pTag, answerOptions, btn, solutionDesc);
      questionWrapper.append(question);
      body.appendChild(questionWrapper);
    }
  }

  /**
   * Returns a list of answer options for the given question
   * @param {String} answer - answer to the question
   * @param {Array} answerArray - array of answer options
   * @param {String} questionNum - current question number
   * @returns {object} New DOM object
   */
  function createAnswers(answer, answerArray, questionNum) {
    let list = gen('ul');
    list.className = "questionList";
    for(let i = 0; i < answerArray.length; i++) {
      let listItem = gen('li');
      let answerChoice = gen('a');
      answerChoice.id = "q" + questionNum + ANSWER_CHOICES[i];
      answerChoice.textContent = ANSWER_CHOICES[i] + ": " + answerArray[i];
      answerChoice.addEventListener('click', function(event) {
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
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
   function gen(tagName) {
    return document.createElement(tagName);
  }
})();