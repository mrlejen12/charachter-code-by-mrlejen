const { Client, ActivityType  , 
    GatewayIntentBits,SlashCommandBuilder, 
    EmbedBuilder,REST, Routes  ,ContextMenuCommandBuilder,ButtonStyle, ActionRowBuilder ,StringSelectMenuBuilder, StringSelectMenuOptionBuilder,ButtonBuilder ,Events, ModalBuilder , TextInputBuilder, TextInputStyle} = require('discord.js');
    const info = require('./config.js')
    const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  presence: {
    activities: [{
      type: ActivityType.Custom, 
      name: info.name, 
      state: info.state,
    }],
  }
  });


 

  
  const fs = require('fs');
  client.login(info.token).catch(error => console.log(`
  You forgot to write a [token]`))
  const private = info.private;
const servers = info.servers;


client.on('guildCreate',async (guild) =>{
  if(private == true){
      if (servers.includes (guild.id)) return;
      else{
          guild.leave();
      }
         }
         else if(private == false){
          return;
      }
  })

  client.on(`ready`, () => {
  client.guilds.cache.forEach(guild => {
if(private == true){
  if (servers.includes (guild.id)) return;
  else{
      guild.leave();
  }
     }
     else if(private == false){
      return;
  }
  });
  }); 

  const owner = info.owner
client.on('ready', () => {
    console.log(`${client.user.username} Is Online !`);
  });



  
client.on("ready", () => {
    const cmdsg = [];


    let slh = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command")
    let btn = new SlashCommandBuilder()
    .setName("button_send")
    .setDescription("send charscter button")
    .addChannelOption(p =>
      p.setName("select_channel")
      .setDescription("select channel"))
    cmdsg.push(slh);
    cmdsg.push(btn);
    const rest = new REST({version: 9}).setToken(info.token);

    try {

    rest.put(
    Routes.applicationCommands(client.user.id),
    { body: cmdsg },
    )
} catch (error) {
    console.error("error")
    }
    })






    client.on("interactionCreate", async message => {
        if (!message.isCommand()) return;

  const { commandName } = message;
  if(commandName === 'ping'){
    const embed = new EmbedBuilder()
    .setDescription(`**
    my ping : \`${client.ws.ping}\`
  **`)       
 message.reply({embeds : [embed]})
                            }
  if(commandName === 'button_send'){
    let mm = message.options.getChannel("select_channel");
    if(message.user.id !== owner){
      message.reply({content: `you not owner `, ephemeral: true})
     }
     else{
    if(mm){
      const embed = new EmbedBuilder()
      .setTitle("**charachter chooser**")
      .setDescription("choose your charachter");
      const select = new StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('1 charachter')
					.setDescription('the 1 charachter')
					.setValue('1charachter'),
				new StringSelectMenuOptionBuilder()
					.setLabel('2 charachter')
					.setDescription('the 2 charachter')
					.setValue('2charachter'),
				new StringSelectMenuOptionBuilder()
					.setLabel('3 charachter')
					.setDescription('the 3 charachter')
					.setValue('3charachter'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);
      message.reply({content: `done send`, ephemeral: true})
      mm.send(({ embeds: [embed],components:[row] , ephemeral: true} ))
    }
  }
}
                        })


 



 client.on("interactionCreate", async interaction => {
    if (interaction.customId === 'starter') {
      if(interaction.values[0] === "1charachter"){
        let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    let psps =  jsonData["1charachter_"+interaction.user.id]
    if(psps === undefined){
      const create_charachter1 = new ButtonBuilder()
      .setCustomId('create_charachter1')
			.setLabel('click to create charachter 1')
			.setStyle(ButtonStyle.Secondary);
      const row = new ActionRowBuilder()
			.addComponents(create_charachter1);
      interaction.reply({content: `you dont have charachter 1`,components: [row], ephemeral: true})
    }
    else{
      jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter1" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
      interaction.reply({content: `done selected charachter to 1 `, ephemeral: true})
}
       
      }
      if(interaction.values[0] === "2charachter"){
        let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    let psps =  jsonData["2charachter_"+interaction.user.id]
    if(psps === undefined){
      const create_charachter1 = new ButtonBuilder()
      .setCustomId('create_charachter2')
			.setLabel('click to create charachter 2')
			.setStyle(ButtonStyle.Secondary);
      const row = new ActionRowBuilder()
			.addComponents(create_charachter1);
      interaction.reply({content: `you dont have charachter 2`,components: [row], ephemeral: true})
    }
    else{
      jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter2" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
      interaction.reply({content: `done selected charachter to 2 `, ephemeral: true})
}
      }
      if(interaction.values[0] === "3charachter"){
        let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    let psps =  jsonData["3charachter_"+interaction.user.id]
    if(psps === undefined){
      const create_charachter1 = new ButtonBuilder()
      .setCustomId('create_charachter3')
			.setLabel('click to create charachter 3')
			.setStyle(ButtonStyle.Secondary);
      const row = new ActionRowBuilder()
			.addComponents(create_charachter1);
      interaction.reply({content: `you dont have charachter 3`,components: [row], ephemeral: true})
    }
    else{
      jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter3" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
      interaction.reply({content: `done selected charachter to 3 `, ephemeral: true})
}
       
      }
    }
















    if (interaction.customId === 'create_charachter1') {
      const modal = new ModalBuilder()
			.setCustomId('myModal_1harachter')
			.setTitle('charachter 1');
      const favoriteColorInput = new TextInputBuilder()
			.setCustomId('first_name_1charachter')
      .setMaxLength(20)
			.setLabel("first name")
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('last_name_1charachter')
			.setLabel("last name")
      .setMaxLength(20)
			.setStyle(TextInputStyle.Short);
      
      const input = new TextInputBuilder()
      .setCustomId('sex_1charachter')
			.setLabel("sex")
      .setMinLength(3)
      .setMaxLength(6)
			.setStyle(TextInputStyle.Short);
      const input2 = new TextInputBuilder()
      .setCustomId('country_1charachter')
			.setLabel("country")
      .setMaxLength(15)
			.setStyle(TextInputStyle.Short);
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(input);
    const third2ActionRow = new ActionRowBuilder().addComponents(input2);
		modal.addComponents(firstActionRow, secondActionRow,thirdActionRow,third2ActionRow);
    interaction.showModal(modal)
    
    }

    if (interaction.customId === 'create_charachter2') {
      const modal = new ModalBuilder()
			.setCustomId('myModal_2harachter')
			.setTitle('charachter 2');
      const favoriteColorInput = new TextInputBuilder()
			.setCustomId('first_name_2charachter')
      .setMaxLength(20)
			.setLabel("first name")
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('last_name_2charachter')
			.setLabel("last name")
      .setMaxLength(20)
			.setStyle(TextInputStyle.Short);
      
      const input = new TextInputBuilder()
      .setCustomId('sex_2charachter')
			.setLabel("sex")
      .setMinLength(3)
      .setMaxLength(6)
			.setStyle(TextInputStyle.Short);
      const input2 = new TextInputBuilder()
      .setCustomId('country_2charachter')
			.setLabel("country")
      .setMaxLength(15)
			.setStyle(TextInputStyle.Short);
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(input);
    const third2ActionRow = new ActionRowBuilder().addComponents(input2);
		modal.addComponents(firstActionRow, secondActionRow,thirdActionRow,third2ActionRow);
    interaction.showModal(modal)
    
    }



    if (interaction.customId === 'create_charachter3') {
      const modal = new ModalBuilder()
			.setCustomId('myModal_3harachter')
			.setTitle('charachter 3');
      const favoriteColorInput = new TextInputBuilder()
			.setCustomId('first_name_3charachter')
      .setMaxLength(20)
			.setLabel("first name")
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('last_name_3charachter')
			.setLabel("last name")
      .setMaxLength(20)
			.setStyle(TextInputStyle.Short);
      
      const input = new TextInputBuilder()
      .setCustomId('sex_3charachter')
			.setLabel("sex")
      .setMinLength(3)
      .setMaxLength(6)
			.setStyle(TextInputStyle.Short);
      const input2 = new TextInputBuilder()
      .setCustomId('country_3charachter')
			.setLabel("country")
      .setMaxLength(15)
			.setStyle(TextInputStyle.Short);
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(input);
    const third2ActionRow = new ActionRowBuilder().addComponents(input2);
		modal.addComponents(firstActionRow, secondActionRow,thirdActionRow,third2ActionRow);
    interaction.showModal(modal)
    
    }



});

client.on(Events.InteractionCreate, interaction => {
  if (interaction.customId === 'myModal_1harachter') {
	if (!interaction.isModalSubmit()) return;
	const favoriteColor = interaction.fields.getTextInputValue('first_name_1charachter');
	const hobbies = interaction.fields.getTextInputValue('last_name_1charachter');
  const input = interaction.fields.getTextInputValue('sex_1charachter');
  const input2 = interaction.fields.getTextInputValue('country_1charachter');
  let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    jsonData["1charachter_"+interaction.user.id] = { info : {first_name: favoriteColor ,last_name:hobbies,sex:input,country:input2} };
    fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
    interaction.reply({content: `done create charachter 1`, ephemeral: true})
    jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter1" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
  }
});
client.on(Events.InteractionCreate, interaction => {
  if (interaction.customId === 'myModal_2harachter') {
	if (!interaction.isModalSubmit()) return;
	const favoriteColor = interaction.fields.getTextInputValue('first_name_2charachter');
	const hobbies = interaction.fields.getTextInputValue('last_name_2charachter');
  const input = interaction.fields.getTextInputValue('sex_2charachter');
  const input2 = interaction.fields.getTextInputValue('country_2charachter');
  let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    jsonData["2charachter_"+interaction.user.id] = { info : {first_name: favoriteColor ,last_name:hobbies,sex:input,country:input2} };
    fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
    interaction.reply({content: `done create charachter 2`, ephemeral: true})
    jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter2" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
  }
});
client.on(Events.InteractionCreate, interaction => {
  if (interaction.customId === 'myModal_3harachter') {
	if (!interaction.isModalSubmit()) return;
	const favoriteColor = interaction.fields.getTextInputValue('first_name_3charachter');
	const hobbies = interaction.fields.getTextInputValue('last_name_3charachter');
  const input = interaction.fields.getTextInputValue('sex_3charachter');
  const input2 = interaction.fields.getTextInputValue('country_3charachter');
  let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    jsonData["3charachter_"+interaction.user.id] = { info : {first_name: favoriteColor ,last_name:hobbies,sex:input,country:input2} };
    fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
    interaction.reply({content: `done create charachter 3`, ephemeral: true})
    jsonData["charachter_"+interaction.user.id] = { anycharachter:"charachter3" };
      fs.writeFileSync('charachter.json', JSON.stringify(jsonData));
  }
});



client.on("messageCreate",message =>{
  if(message.content.startsWith("#card")){
    let user = message.mentions.users.first()
    if(!user){
      let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    let psps1 =  jsonData["1charachter_"+message.author.id]
    let psps2 =  jsonData["2charachter_"+message.author.id]
    let psps3 =  jsonData["3charachter_"+message.author.id]
if(psps1&psps2&&psps3 == undefined){
message.channel.send("you dont have any charachter ")
}
else{
  let lpsps2 =  jsonData["charachter_"+message.author.id]
  if(lpsps2 == undefined){
    message.channel.send("you dont have any charachter ")
  }
  else{
    let psps =  jsonData["charachter_"+message.author.id].anycharachter
  if(psps == "charachter1"){
    const embed = new EmbedBuilder()
    .setTitle('**First character**')
    .setColor(0x0099FF)
    .setTimestamp()
    .setDescription(`
    **
    -FirstName : ${psps1.info.first_name}
    -LastName : ${psps1.info.last_name}
    -sex : ${psps1.info.sex}
    -country : ${psps1.info.country}
    **
    `)
    .setFooter({ text: 'by MrLejen'});

message.channel.send({ embeds: [embed] })
  }
  if(psps == "charachter2"){
    const embed = new EmbedBuilder()
    .setTitle('**second  character**')
    .setColor(0x0099FF)
    .setTimestamp()
    .setDescription(`
    **
    -FirstName : ${psps2.info.first_name}
    -LastName : ${psps2.info.last_name}
    -sex : ${psps2.info.sex}
    -country : ${psps2.info.country}
    **
    `)
    .setFooter({ text: 'by MrLejen'});

message.channel.send({ embeds: [embed] })
      }
      if(psps == "charachter3"){
        const embed = new EmbedBuilder()
        .setTitle('**third   character**')
        .setColor(0x0099FF)
        .setTimestamp()
        .setDescription(`
        **
        -FirstName : ${psps3.info.first_name}
        -LastName : ${psps3.info.last_name}
        -sex : ${psps3.info.sex}
        -country : ${psps3.info.country}
        **
        `)
        .setFooter({ text: 'by MrLejen'});
    
    message.channel.send({ embeds: [embed] })
          }
}
}
    }


    if(user){
      if(user.bot){
        message.channel.send("bots dont have charachter")
      }
      else{
      let data = fs.readFileSync('charachter.json');
    let jsonData = JSON.parse(data);
    let psps1 =  jsonData["1charachter_"+user.id]
    let psps2 =  jsonData["2charachter_"+user.id]
    let psps3 =  jsonData["3charachter_"+user.id]
if(psps1&psps2&&psps3 == undefined){
message.channel.send('the user dont have any charachter')
}
else{
  let lpsps2 =  jsonData["charachter_"+user.id]
  if(lpsps2 == undefined){
    message.channel.send("the user dont have any charachter")
  }
  else{
    let psps =  jsonData["charachter_"+user.id].anycharachter
  if(psps == "charachter1"){
    const embed = new EmbedBuilder()
    .setTitle('**First character**')
    .setColor(0x0099FF)
    .setTimestamp()
    .setDescription(`
    **
    -FirstName : ${psps1.info.first_name}
    -LastName : ${psps1.info.last_name}
    -sex : ${psps1.info.sex}
    -country : ${psps1.info.country}
    **
    `)
    .setFooter({ text: 'by MrLejen'});

message.channel.send({ embeds: [embed] })
  }
  if(psps == "charachter2"){
    const embed = new EmbedBuilder()
    .setTitle('**second  character**')
    .setColor(0x0099FF)
    .setTimestamp()
    .setDescription(`
    **
    -FirstName : ${psps2.info.first_name}
    -LastName : ${psps2.info.last_name}
    -sex : ${psps2.info.sex}
    -country : ${psps2.info.country}
    **
    `)
    .setFooter({ text: 'by MrLejen'});

message.channel.send({ embeds: [embed] })
      }
      if(psps == "charachter3"){
        const embed = new EmbedBuilder()
        .setTitle('**third   character**')
        .setColor(0x0099FF)
        .setTimestamp()
        .setDescription(`
        **
        -FirstName : ${psps3.info.first_name}
        -LastName : ${psps3.info.last_name}
        -sex : ${psps3.info.sex}
        -country : ${psps3.info.country}
        **
        `)
        .setFooter({ text: 'by MrLejen'});
    
    message.channel.send({ embeds: [embed] })
          }
}
}
      }
    }
  }
})


client.on("messageCreate",message=>{
if(message.content.startsWith("#help")){
  if(message.author.bot || message.channel.type == "dm") return message.reply("Server only commands")
  const embed = new EmbedBuilder()
  .setColor(0x0099FF)
	.setTitle('**help command**')
	.setDescription(`
  **
  \`#card\` : show you charachter information
  \`#card + <mention user>\` : show user charachter information
  **
  
  `)
	.setTimestamp()
	.setFooter({ text: 'by mrlejen'});

message.channel.send({ embeds: [embed] });
}
})
