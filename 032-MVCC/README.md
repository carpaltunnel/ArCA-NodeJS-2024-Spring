# MVC(C)
Model–View–Controller (usually known as MVC) is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.

## Model
The model is the layer that manages your data.  In a web application this usually would be the component that interacts with the database.  All requests for data queries or changes should go through the model.

## View
The view is the interface that a user sees and interacts with.  So, normally HTML/CSS/JS in a web application.

## Controller
The controller is the intermediary layer between the user and the model.  Controllers accept requests from users and translate them into commands for the model.  This name corresponds exactly to the "controllers" we created in Express and aligns with API endpoints.  The controller can also affect the view.  For example, if a view (UI) requests data from a controller, which queries it from the model, that data is probably going to be displayed or used in the view.

Broadly put, the model manages all access to your data, the user "sees" the view, and the user (or view) "uses" the controller.

## Coordinator
Outside of the standard MVC model is the idea of a "coordinator".  A coordinator is just another layer of abstraction that helps us compartmentalize our application logic.  The coordinator layer is inserted between the controller and model.  So, user invokes a controller, controller calls coordinator, coordinator calls model, then data manipulation is done in the model and returned.

### But why add a coordinator?  
In very simple applications the coordinator probably isn't very useful.  It likely is just calling the required model function and passing through the exact data that was provided to it by the controller.  Where coordinators shine is in more complex applications when you notice that your controller logic is getting rather large and often has duplicated code.  A simple example that I like to use is the addition of an `id` field when creating a new entity or adding tracking information (who/what/when) when an entity is updated.  Every time a new entity is created, you want to generate a new unique identifier field and assign it to the `id` property.  Of course, you could do this in the controller, but by placing the logic in the coordinator, and always calling the coordinator, the bits of logic that are simply always applied are abstracted away and we can focus on our application specific logic.

Another good argument for using a coordinator is when parts of your application start using other route specific logic.  If you have Thneed logic that also needs to create a Widget, without a coordinator you would have to require your Widget model in the Thneed controller and remember to do any extra manipulation (like adding an id) there... which would be duplicated from your Widget controller.  But, if you have a Widget coordinator that already does that logic because you're using it from the Widget controller, your Thneed controller can simply import the Widget coordinator and you know that everything is already handled.

For this approach to be successful you need to ensure that controllers always call coordinators, and only coordinators call models.  If your controllers ever call models directly, the advantages of a coordinator are lost.

## Example
Now, let's apply this approach to the Express project we created in the last lesson.