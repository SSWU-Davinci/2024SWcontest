const userProvider = require('../User/userProvider');

// 로그인
exports.login = async (req, res) => {
  const { id, password } = req.body;

    try {
        const user = await userProvider.loginCheck(id, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
            res.redirect('/home/inventory');         // 로그인 성공 시 inventory 페이지로 리다이렉트
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//회원가입
exports.join = async (req, res) => {
  const {name, id, password} = req.body;

    try {
        const user = await userProvider.joinCheck(name, id, password);
        if (user.success) {
            res.status(200).json({ message: 'Join successful! Go to Log in', user });
            res.redirect('/home');         // 회원가입 성공 시 home 페이지로 리다이렉트
        } else if (user.message === 'id already exists') {
            res.status(409).json({ message: 'ID already exists' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
  try {
    const user = await userProvider.joinCheck(name, id, password);
    if (user) {
      res.status(200).json({ message: 'Join successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });

// id 중복 체크 , name 중복 체크
exports.nameCheck = async (req, res) => {
  const {name} = req.body;

  try {
    const user = await userProvider.nameCheck(name);
    if(user.success){
      if (user.exists) {
        res.status(200).json({ success: false, message: 'Name already exist', user });
      } else {
        res.status(200).json({ success: true, message: 'Name is available' });
      }
    } else {
      res.status(401).json(user);
    }
  } catch (error) {
    console.error('Error during name check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.idCheck = async (req, res) => {
  const {id} = req.body;

  try {
    const user = await userProvider.idCheck(id);
    if(user.success){
      if (user.exists) {
        res.status(200).json({ success: false, message: 'ID already exist', user });
      } else {
        res.status(200).json({ success: true, message: 'ID is available' });
      }
    } else {
      res.status(401).json(user);
    }
  } catch (error) {
    console.error('Error during ID check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}