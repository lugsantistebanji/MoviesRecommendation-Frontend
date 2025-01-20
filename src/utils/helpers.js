export const ratingToPercentage = (rating) => {
  return (rating * 10 )?.toFixed(1);
} 

export const resolveRatingColor = (rating) => {
  if (rating >= 7) {
    return 'green.400';
    
  }
  else if (rating >= 5) {
    return 'orange.400';
  }

  return 'red.400';
}
