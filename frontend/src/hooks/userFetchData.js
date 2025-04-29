import { useState, useEffect } from 'react';

const fetchUserStats = async () => {
    const res = await fetch("/api/users/stats", {
      headers: {
        Authorization: `Bearer ${token}`, // your JWT
      },
    });
    const data = await res.json();
    console.log(data);
  };
  