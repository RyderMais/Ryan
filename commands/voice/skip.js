module.exports = {
    name: 'skipTrack',
    aliases: ["skip"],
    code: `
        $onlyIf[$queueLength>0;No song is playing right now.]
        $if[$hasPlayer==true]
            $skipTrack
                $color[2878A1]
                $title[Skip]
                $description[Now playing $songInfo[title;1]]
                $description[Requested by $songInfo[requester;0]
                $footer[Skipped by $username (discussing with $queueLength songs left)]
                $addTimestamp
            $onlyIf[$checkContains[$channelType;text;news]==true;]
        $else
            $color[2878A1]
            $title[Skipped]
            $description[No song is playing right now.]
            $addTimestamp
            $onlyIf[$checkContains[$channelType;text;news]==true;]
    `
} 