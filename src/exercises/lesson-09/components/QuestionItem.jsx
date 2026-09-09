import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options);
  const { dispatch, state } = useContext(SurveyContext);

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId:
          state.ui.editingQuestionId === question.id ? null : question.id,
      },
    });
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    console.log('TODO: Implement delete functionality');
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
  };

  const handleOptionSave = (index, newText) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: newText,
      },
    });
  };

  const handleOptionDelete = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });
  };

  const handleAddOption = () => {
    const optionText = prompt('Enter new option:');

    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: optionText.trim(),
        },
      });
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {state.ui.editingQuestionId === question.id ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete (TODO)
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      {/* <div className={styles['question-content']}>
        <h3>{question.question}</h3>
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                <span className={styles['option-text']}>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {state.ui.editingQuestionId === question.id ? (
        <div>
          <input
            type="text"
            value={workingText}
            onChange={(e) => setWorkingText(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>

          <button
            onClick={() =>
              dispatch({
                type: 'SET_EDITING_QUESTION',
                payload: {
                  questionId: null,
                },
              })
            }
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles['question-content']}>
          <h3>{question.question}</h3>
        </div>
      )}
      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          {question.options.map((option, index) => (
            <div key={index} className={styles['option-item']}>
              <input
                type="text"
                value={workingOptions[index]}
                onChange={(e) => {
                  const updatedOptions = [...workingOptions];
                  updatedOptions[index] = e.target.value;
                  setWorkingOptions(updatedOptions);
                }}
              />

              <button
                onClick={() => handleOptionSave(index, workingOptions[index])}
              >
                Save
              </button>

              <button
                onClick={() => handleOptionDelete(index)}
                disabled={question.options.length <= 2}
              >
                Delete
              </button>
            </div>
          ))}

          <button onClick={handleAddOption}>+ Add Option</button>
        </div>
      )}
    </div>
  );
}
