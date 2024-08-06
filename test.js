// const arr = [
//     {
//         id:1
//     },
//     {
//         id:2
//     },
//     {
//         id : 3
//     }
// ]
// const a = arr[arr.length - 1].id+1;
// const b = {id:a};
// arr.push(b);
// // console.log(b);
// // console.log(a);
// console.log(arr);

const arr = [1,2,3,{id : 10}];
const news = arr.indexOf({id:10});
arr[news]={id:11}
console.log(news)
console.log(arr)