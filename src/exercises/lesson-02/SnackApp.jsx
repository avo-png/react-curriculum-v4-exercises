// import React from 'react';

export default function SnackList() {
  const snacks = [
    { rank: 5, name: 'Coconut Almond Chunks' },
    { rank: 4, name: 'Salmon Jerky' },
    { rank: 3, name: 'BBQ Chips' },
    { rank: 2, name: 'Pistachios' },
    { rank: 1, name: 'Dried Apples' },
  ];

  const snacksList = snacks.toSorted((a, b) => a.rank - b.rank);
  console.log(snacksList);

  return (
    <div className="snack-container">
      <h1 className="header">My Rated Snacks</h1>
      {snacksList.map((snack) => (
        <p key={snack.rank}>
          {snack.rank}: {snack.name}
        </p>
      ))}
      <footer style={{ fontSize: '10px' }}>TM Snack App.</footer>
    </div>
  );
}
