const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Database is connected... ✨"))
  .catch((err) => console.error("📡 Connection is lost:", err));

//Schema ===> shape of a document
///Docoment, Collection, Database

// const user = [
//   { name: "user1", age: 20 },
//   { name: "user2", age: 30 },
// ];

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  isMarried: Boolean,
  salary: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);

async function storeInformation() {
  const user = new User({
    name: "Omid",
    age: 28,
    isMarried: false,
    salary: 50,
    gender: "male",
  });

  await user.save();
  console.log(user);
}

// storeInformation();

async function fetchInformation() {
  // to find all ==> ({})
  // to find by quary ==> ({isMarries: false , salary: 8000})
  const users = await User.find({})
    .select("-name salary")
    .sort("salary")
    .limit(2)
    .countDocuments();
  console.log("users", users);
  //Select:
  //   فقط مورادی که نوشته شده رو برای ما ریسپانس میده
  //   اگر قبلشون منها بذاریم این موارد رو از لیست ریسپانس حذف میکنه و بقیه رو نشون میده
  //Sort:
  // اگر برای سورت هم منفی بذاریم نتیجه رو عکس به ما نشون میده
  //Limit:
  //   تعداد مقداری که تو هر ریسپانس بخواد به ما بده رو مینویسم برای...
  // برای مثال اگر بخوایم ۲ تا ۲تا بهمون ریسپانس بده باید لیمیت رو ۲ بذاریم
  //CountDocuments:
  // تعداد داکیومنت هایی که داریم رو میگه چندتا هست
}

// fetchInformation();

async function fetchById(id) {
  const user = await User.findById(id);
  console.log("user", user);
}

// fetchById('12356456465487ad')

async function fetchByComprationOprators() {
  // eq ==> equal
  // ne ==> Not equal
  // gt ==> gratter than
  // gte ==> gratter than equal
  // lt ===> less than
  // lte ===> less than equal
  // in ===> in
  // nin ===> not in
  const users = await (
    await User.find({ age: { $gt: 30 } })
  ).or([{ isMarried: true }, { age: 30 }]);
  //   .or: shows one one of conditions
  //   .and check both in it will return
}
