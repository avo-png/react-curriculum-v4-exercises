import styles from './SnackForm.module.css';
import { useEffect, useState } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name ?? '');
      setRating(editingSnack.rating ?? '');
    } else {
      setName('');
      setRating('');
    }

    setTouched({ name: false, rating: false });
  }, [editingSnack]);

  const isEditing = Boolean(editingSnack);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const rating = formData.get('rating');

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);
      e.target.reset();
    }
  }

  function validateName() {
    return name.trim() !== '';
  }
  //   [ ] Create `validateRating()` function that returns `true` if rating is selected (not empty)
  function validateRating() {
    return rating.trim() !== '';
  }
  // - [ ] Create `getNameError()` function that returns error message if name is invalid AND touched
  //   - Example: `"Snack name is required"`
  function getNameError() {
    if (!validateName() && touched.name) {
      return 'Snack name is required';
    }
    return '';
  }
  // - [ ] Create `getRatingError()` function that returns error message if rating is invalid AND touched
  //   - Example: `"Please select a rating"`
  function getRatingError() {
    if (!validateRating() && touched.rating) {
      return 'Please select a rating';
    }
    return '';
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          className={styles['field-input']}
          onChange={(e) => setName(e.target.value)}
          onFocus={setTouched((prev) => ({ ...prev, name: true }))}
          placeholder="Enter snack name"
        />
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          min="1"
          max="5"
          className={styles['field-input']}
          onChange={(e) => setRating(e.target.value)}
          onFocus={setTouched((prev) => ({ ...prev, rating: true }))}
          placeholder="Rate 1-5"
        />
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
