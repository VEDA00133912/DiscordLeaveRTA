const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    userId: String,
    joinTime: Date, 
});

const User = mongoose.model('User', userSchema);

module.exports = {
    connectToDB: async () => {
        try {
            await mongoose.connect(mongodb);
            console.log('[SUCCESS] Connected to MongoDB!');
        } catch (err) {
            console.error('[ERROR] Could not connect to MongoDB:', err);
        }
    },

    saveJoinTime: async (userId, joinTime) => {
        try {
            await User.findOneAndUpdate(
                { userId },
                { joinTime },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error(`[ERROR] 参加時刻の保存に失敗しました（${userId}）:`, err);
        }
    },
    calculateDuration: async (userId) => {
        try {
            const user = await User.findOne({ userId });
            if (!user || !user.joinTime) {
                console.error(`[ERROR] （${userId})のデータが見つかりません`);
                return { duration: 'データがありません', joinDate: 'データがありません' };
            }

            const joinTime = user.joinTime.getTime(); 
            const leaveTime = Date.now(); 
            const durationMs = leaveTime - joinTime;
            const seconds = ((durationMs / 1000) % 60).toFixed(2); 
            const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
            const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
            const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

            const duration = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;

            const joinDate = user.joinTime.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            return { duration, joinDate };
        } catch (err) {
            console.error(`[ERROR] 滞在時間の計算に失敗しました:`, err);
            return { duration: 'エラー', joinDate: 'エラー' };
        }
    },
    deleteUserData: async (userId) => {
        try {
            await User.findOneAndDelete({ userId });
        } catch (err) {
            console.error(`[ERROR] ユーザーデータの削除に失敗しました(${userId}):`, err);
        }
    },
};