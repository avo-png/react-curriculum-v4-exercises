//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Alix V.';
  const age = 31;
  const hobbies = [
    { id: 1, title: 'read' },
    { id: 2, title: 'bike' },
    { id: 3, title: 'garden' },
  ];
  return (
    <div>
      <h1>{name}</h1>
      <p>
        {' '}
        Hi, my name is {name} and I am {age} years old. I am an aspiring
        software engineer, taking the Code the Dream React course. I am kind of
        a private and boring individual, but my cat is the best thing I have
        going on in my life, so I live for her. In my spare time, I like to:
        {hobbies.map((hobby) => (
          <li key={hobby.id}> {hobby.title}</li>
        ))}
      </p>
    </div>
  );
}
