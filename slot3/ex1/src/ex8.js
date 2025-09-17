const ages = [12, 17, 19, 20, 25, 30, 15, 40];

const stats = ages.reduce(
  (acc, age) => {
    // Tính tổng
    acc.total += age;

    // Min & Max
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);

    // Gom nhóm
    if (age >= 13 && age <= 19) acc.buckets.teen++;
    else if (age >= 20) acc.buckets.adult++;

    return acc;
  },
  {
    total: 0,
    min: Infinity,
    max: -Infinity,
    buckets: { teen: 0, adult: 0 },
  }
);

// cách viết khác 
const total = ages.reduce((sum, age) => sum + age, 0);
const min = Math.min(...ages);
const max = Math.max(...ages);

const buckets = {
  teen: ages.filter(a => a >= 13 && a <= 19).length,
  adult: ages.filter(a => a >= 20).length,
};


console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", stats.buckets);
