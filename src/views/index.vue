<style>


	.center {

		height: 765px;
		background-image: url('https://pic4.zhimg.com/v2-7f4cd731e0a8757eff08b1e31f5d4abf_r.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	h1 {
		font-size: 30px;
		color: black;
	}
 
	.logon {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		/* position: relative;
		overflow: hidden; */
		width: 768px;
		max-width: 100%;
		min-height: 480px;
		margin-top: 20px;
		display: flex;
		background: -webkit-linear-gradient(right, #4284db, #29eac4);
	}
 
	.overlaylong {
		border-radius: 10px 0 0 10px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaylongleft {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		transform: translateX(100%);
		transition: transform 0.6s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaylongright {
		border-radius: 10px 0 0 10px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		transform: translateX(0%);
		transition: transform 0.6s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaytitle {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
 
	.overlaytitleH2 {
		font-size: 30px;
		color: #fff;
		margin-top: 20px;
	}
 
	.overlaytitleP {
		font-size: 15px;
		color: #fff;
		margin-top: 20px;
	}
 
	.overlaytitleleft {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translateX(0%);
		transition: transform 0.6s ease-in-out;
	}
 
	.overlaytitleright {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translateX(-100%);
		transition: transform 0.6s ease-in-out;
	}
 
	.overlaytitle-Signin {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.overlaytitle-Signup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.buttongohs {
		width: 180px;
		height: 40px;
		border-radius: 50px;
		border: 1px solid #fff;
		color: #fff;
		font-size: 15px;
		text-align: center;
		line-height: 40px;
		margin-top: 40px;
	}
 
	.overlaylongH2 {
		font-size: 25px;
		color: black;
		/* width: 250px; */
	}
 
	.overlaylong-Signin {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.overlaylong-Signup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	input {
		background-color: #eee;
		border: none;
		padding: 12px 15px;
		margin: 10px 0;
		width: 240px;
	}
	h3{
		font-size: 10px;
		margin-top: 10px;
		cursor: pointer;
	}
	.inupbutton{
		background-color: #29eac4;
		border: none;
		width: 180px;
		height: 40px;
		border-radius: 50px;
		font-size: 15px;
		color: #fff;	
		text-align: center;
		line-height: 40px;
		margin-top: 30px;
	}
</style>
 
<template>

	<div class="center">
		<div class="logon">
			<div :class="overlaylong">
				<div class="overlaylong-Signin" v-if="disfiex == 0">
					<h2 class="overlaylongH2">登录</h2>
					<input type="text" placeholder="请输入用户名" v-model="username" >
					<input type="password" placeholder="请输入密码" v-model="password">
					<button  class="inupbutton" @click="handleSignin">登录</button>
				</div>
				<div class="overlaylong-Signup" v-if="disfiex == 1">
					<h2 class="overlaylongH2">注册</h2>
					<input type="text" placeholder="请输入用户名" v-model="username" >
					<input type="password" placeholder="请输入密码" v-model="password">
					<button  class="inupbutton" @click="handleSignup">注册</button>
				</div>
 
			</div>
			<div :class="overlaytitle">
				<div class="overlaytitle-Signin" v-if="disfiex == 0">
					<h2 class="overlaytitleH2">你好,朋友！</h2>
					<p class="overlaytitleP">
						输入你的个人信息并加入我们!	
					</p>
					<div class="buttongohs" @click="Signin">来注册！</div>
				</div>
				<div class="overlaytitle-Signup" v-if="disfiex == 1">
					<h2 class="overlaytitleH2">已有账号?</h2>
					<p class="overlaytitleP">输入你的信息就可以啦！</p>
					<div class="buttongohs" @click="Signup">来登录！</div>
				</div>
			</div>
		</div>
 
	</div>
</template>
 
<script>

	export default {
		data() {
			return {
				overlaylong: 'overlaylong',
				overlaytitle: 'overlaytitle',
				disfiex: 0,
				username: '',
        		password: '',
			}
		},
		methods: {
			async handleSignup() {
			// 这里处理注册逻辑
			if(this.username===""){
				this.$message({
				type: 'error',
				message: '用户名不能为空',
				showClose: true,
			})
				return
			}
			if(this.password===""){
				this.$message({
				type: 'error',
				message: '密码不能为空',
				showClose: true,
			})
				return
			}
			//将请求转为对象
			let res = {
			Username: this.username, // 假设 this.username 是你从输入字段绑定的数据
			Password: this.password,  // 同上，针对密码字段
			};
			//调用api接口
			await this.$api.sign_up(res).then((param)=>{
			if (param.data.code === 0) {
				this.$message({
				type: 'success',
				message: '注册成功!',
			})
  			}
			else if(param.data.code === 1){
				// this.$alert.put("用户名已经存在,请您修改用户名")
				this.$message({
				type: 'error',
				message: '用户名已经存在,请您修改用户名',
			})
			}
			else if(param.data.code === 2){
				// this.$alert.put("添加用户失败")
				this.$message({
				type: 'error',
				message: '添加用户失败',
			})
			}
			else{
				// this.$alert.put("未知错误,请联系管理员")
				this.$message({
				type: 'error',
				message: '未知错误,请联系管理员',
			})
			}
			})
			this.username="";
			this.password="";
			},

			async handleSignin() {
			// 这里处理登录逻辑

			if(this.username===""){
				localStorage.setItem('jwttoken', "")
				// this.$alert.put("用户名不能为空")
				this.$message({
				type: 'error',
				message: '用户名不能为空',
			})
				
				return
			}
			if(this.password===""){
				localStorage.setItem('jwttoken', "")
				// this.$alert.put("密码不能为空")
				this.$message({
				type: 'error',
				message: '密码不能为空',
			})
				return
			}

			//将请求转为对象
			let res = {
			Username: this.username, // 假设 this.username 是你从输入字段绑定的数据
			Password: this.password,  // 同上，针对密码字段
			};
			//调用api接口
			await this.$api.sign_in(res).then((param)=>{
			if (param.data.code === 0) {
    			// alert("注册成功")
				// this.$alert.put("登录成功")
				this.$message({
				type: 'success',
				message: '登录成功',
			})
				localStorage.setItem('token', param.data.token)
				// console.log(localStorage.getItem('jwttoken'))
				this.$router.push('/cpuinfo')
  			}
			else{
				localStorage.setItem('jwttoken', "")
				// this.$alert.put("密码错误")
				this.$message({
				type: 'error',
				message: '密码错误',
			})
			}
			})
			this.username="";
			this.password="";

			},

			Signin() {
				this.overlaylong = "overlaylongleft"
				this.overlaytitle = "overlaytitleright"
				setTimeout(() => {
					this.disfiex = 1
				}, 200)
			},
			Signup() {
				this.overlaylong = "overlaylongright"
				this.overlaytitle = "overlaytitleleft"
 
				setTimeout(() => {
					this.disfiex = 0
				}, 200)
 
			},
			
		}
	}
</script>