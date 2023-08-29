module.exports = [{
    name: "slot",
    aliases: ["slots", "casino", "slot-machine", "slotmachine"],
    code: `
        $editMessage[$get[id];$get[s1] $get[s2] $get[s3] $if[$get[s1]==$get[s2]==$get[s3];🎉;❌] $if[$get[s1]==$get[s2]==$get[s3];$get[win];$get[lose]]]
        $let[s3;$randomText[💵;💎;🥇;💯;💰]]
        $wait[1s]
        
        $editMessage[$get[id];$get[s1] $get[s2] :white_large_square:] 
        $let[s2;$randomText[💰;💯;💎;💵;🥇]]
        $wait[1s]
            
        $editMessage[$get[id];$get[s1] :white_large_square: :white_large_square:]   
        $let[s1;$randomText[💎;🥇;💯;💰;💵]]
        $wait[2s]   
            
        $let[id;$sendMessage[:white_large_square: :white_large_square: :white_large_square:;true]] 
    `
}]