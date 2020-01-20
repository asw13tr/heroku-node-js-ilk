const mDatas = { layout:'panel/layout' }

module.exports.index = (require, response) => {
    let datas = { title:'Yönetici Paneli', ...mDatas }
    response.render('panel/index', datas);
}
