"""
Copyright © TarsOnlineCafe 2020-2023 - https://github.com/tar420 
Description:
A personalized discord bot in Python programming language.🐍 

Version: 4.1
"""
import discord.abc
from discord.ext import commands
from discord.ext.commands import Context

from helpers import checks


# Here we name the cog and create a new class for the cog.
class util(commands.Cog, name="util"):
    def __init__(self, bot):
        self.bot = bot

    # Here you can just add your own commands, you'll always need to provide "self" as first parameter.
    # Activate your dev badge using activatedevb
    @commands.hybrid_command(
        name="activatedevb",
        description="This activates your developer badge for discord.",
    )
    # This will only allow non-blacklisted members to execute the command
    @checks.not_blacklisted()
    # This will only allow owners of the bot to execute the command -> config.json
    @checks.is_owner()

    async def activatedevb(self, context: Context):
        embed = discord.Embed(
            description="Welcome my name is Duncan, I am here to assist you. Your Active Developer Badge will now be activated if you have followed all necessary steps.",
            color=0x9C84EF,
        )
        embed.set_author(name="Active Dev Badge")
        embed.add_field(name="__**Owner:**__", value="nottherealtar", inline=True)
        
        embed.add_field(
            name="__**Where's my badge?**__:",
            value=f"Eligibility for the badge is checked by Discord in intervals, at this moment in time, 24 hours is the recommended time to wait before trying.",
            inline=False,
        )

        embed.add_field(
            name="__**It's been 24 hours, now how do I get the badge?**__:",
            value=f"If it's already been 24 hours, you can head to https://discord.com/developers/active-developer and fill out the 'form' there.",
            inline=False,
        )

        embed.set_footer(text=f"Requested by {context.author}")
        await context.send(embed=embed)


# And then we finally add the cog to the bot so that it can load, unload, reload and use it's content.
async def setup(bot):
    await bot.add_cog(util(bot))
    