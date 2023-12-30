<img align="right" src="Icon/textstorm.svg"/>

# <b>Contributing</b>
First off, thank you for  contributing to TextStorm.

<br>

### <b>Where do I go from here?</b>

> If you've noticed a bug or have a feature request, create one new issue! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.
>
> If you have a general question about TextStorm, you can post it on issues section on github

<br>

### <b>Set up TextStorm Environment</b>

> If this is something you think you can fix, then [fork TextStorm]() to your own Github Account...
>
> Then clone your forked project to your local system...
> 
> Now create your own feature branch with a descriptive name of your branch
> ```sh 
> git branch .....
> ```

<br>

### <b>Set Up a Temp Database</b>

> Once you just set up your environment, here comes a important task which you need to do, that is you need you make your own [FireBase Account](http://console.firebase.google.com)
> 
> #### <u>This is because you are not allowed to request your testing data on Real TextStorm Database</u>
> <br>
>
> <b> After creating your own Firebase Account </b>
>* Create a Firebase Project with a name
>* Start authentication with Email/Password
>* Start real time database
>* Insert the basic structure of data given below in realtime database
```
$root
|
|- Notification
|  |
|  |- body: "TextStorm is ....."
|  |- time: 30000
|  |- title: "TextStorm"
|  
|- Users_Data
   |
   |- data: "null"
```
> * And lastly copy your temp database config and paste at the end of the [index.html](index.html), and comment out the Real TextStorm Database Config
>
> * Because you need it at the end when you would push your code
>
> After you did these all process you can now start your editing and can run your code with your own temp database

<br>

### <b>Finishing up</b>
> When you have successfully done with all your modifications and all, then this is the time for pushing your code and then send the pull request
> But first you need to remove your temp database config (not even comment out your config) and comment in the Real TextStorm Database Config
> * Push your Code to your forked repository
```
git push origin master
```
> * Then to Github then create a pull request by opening pull request and so on. (It's easy that is why not mentioned pull request in details)

> * CONGRATULATIONS !
